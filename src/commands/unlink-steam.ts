import { clearInterval, setInterval, setTimeout } from "node:timers";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type CacheType,
	type CommandInteraction,
	ComponentType,
	type InteractionResponse,
	type Message,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { request } from "undici";
import supabase from "../util/supabase.ts";
import type { Command } from "./index.ts";

async function fetchUserConnections(tokenType: string, accessToken: string) {
	const userResult = await request(
		"https://discord.com/api/users/@me/connections",
		{
			headers: {
				authorization: `${tokenType} ${accessToken}`,
			},
		},
	);

	return (await userResult.body.json()) as {
		friend_sync: boolean;
		id: string;
		metadata_visibility: number;
		name: string;
		show_activity: boolean;
		two_way_link: boolean;
		type: string;
		verified: boolean;
		visibility: number;
	}[];
}

export function steamID64toSteamID32(steamID64: string) {
	if (!steamID64) return null;
	// eslint-disable-next-line unicorn/prefer-string-slice
	return Number(steamID64.substr(-16, 16)) - 6_561_197_960_265_728;
}

async function deleteSelectedAccounts(
	steamIds: string[],
	interaction: CommandInteraction<CacheType>,
) {
	for (const id of steamIds) {
		await supabase.from("steam_accounts").delete().eq("steam32Id", id);
	}

	await interaction.editReply({
		components: [],
		content: "Selected Steam accounts unlinked",
	});
}

async function checkForDiscordConnection(
	interaction: CommandInteraction<CacheType>,
	reply: InteractionResponse<boolean>,
) {
	let isConnected = false;
	const interval = 2_000; // Check every 2 seconds
	const timeout = 60_000; // Stop after 60 seconds

	let checkInterval: Timer | null = null;
	const checkConnection = async () => {
		const tokens = await supabase
			.from("discord_accounts")
			.select("access_token, token_type")
			.eq("providerAccountId", Number(interaction.user.id))
			.single();

		if (tokens.data) {
			isConnected = true;
			await reply.edit({ components: [], content: "Connected!" });
			// Continue with the process here
			if (checkInterval) clearInterval(checkInterval);
			await handleUnlinkSteamAccounts(tokens, interaction);
		}
	};

	checkInterval = setInterval(checkConnection, interval);

	setTimeout(async () => {
		clearInterval(checkInterval);
		if (!isConnected) {
			await reply.delete();
		}
	}, timeout);
}

async function handleUnlinkSteamAccounts(
	tokens,
	interaction: CommandInteraction<CacheType>,
) {
	const data = await fetchUserConnections(
		tokens.data.token_type,
		tokens.data.access_token,
	);
	if (Array.isArray(data)) {
		const steamConnections = data
			.filter(
				(connection) => connection.type === "steam" && connection.verified,
			)
			?.map((connection) => ({
				...connection,
				id: steamID64toSteamID32(connection.id),
			}));

		if (steamConnections.length === 0) {
			if (interaction.replied) {
				await interaction.editReply("No Steam accounts linked.");
			} else {
				await interaction.reply("No Steam accounts linked.");
			}

			return;
		}

		const options = steamConnections.map((connection) =>
			new StringSelectMenuOptionBuilder()
				.setLabel(connection.name)
				.setValue(connection.id.toString()),
		);

		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("select-steam-accounts")
			.setPlaceholder("Select Steam accounts to unlink")
			.setMinValues(1)
			.setMaxValues(steamConnections.length)
			.addOptions(options);

		const row = new ActionRowBuilder().addComponents(selectMenu);

		let response: Message;
		if (interaction.replied) {
			response = await interaction.editReply({
				content: "Select the Steam accounts you want to unlink:",
				components: [row],
				ephemeral: true,
			});
		} else {
			response = await interaction.reply({
				content: "Select the Steam accounts you want to unlink:",
				components: [row],
				ephemeral: true,
			});
		}

		const collector = response.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 60_000,
		});

		collector?.on("collect", async (i) => {
			if (
				i.customId === "select-steam-accounts" &&
				i.user.id === interaction.user.id
			) {
				const selectedIds = i.values;
				await deleteSelectedAccounts(selectedIds, interaction);
			}
		});

		collector?.on("end", async () => {
			if (!collector.ended) {
				if (interaction.replied) {
					await interaction.editReply({
						content: "Steam account unlinking session expired.",
						components: [],
					});
				} else {
					await interaction.reply({
						content: "Steam account unlinking session expired.",
						components: [],
					});
				}
			}
		});
	}
}

export default {
	data: {
		name: "unlink-steam",
		description: "Unlink your Steam account(s) from Dotabod.",
	},
	async execute(interaction) {
		const tokens = await supabase
			.from("discord_accounts")
			.select("access_token, token_type")
			.eq("providerAccountId", Number(interaction.user.id))
			.single();

		if (!tokens.data) {
			const oauth2URL = `https://discord.com/oauth2/authorize?client_id=${process.env.VITE_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5432&scope=connections+identify`;

			const linkButton = new ButtonBuilder()
				.setLabel("Link Discord Account")
				.setStyle(ButtonStyle.Link)
				.setURL(oauth2URL);

			const row = new ActionRowBuilder().addComponents(linkButton);

			const reply = await interaction.reply({
				content: "You need to link your Discord account first!",
				components: [row],
				ephemeral: true,
			});
			await checkForDiscordConnection(interaction, reply);
			return;
		}

		await handleUnlinkSteamAccounts(tokens, interaction);
	},
} satisfies Command;
