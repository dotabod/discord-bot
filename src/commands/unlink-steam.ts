import { clearInterval, setInterval, setTimeout } from "node:timers";
import { URLSearchParams } from "node:url";
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

async function refreshDiscordToken(refreshToken: string) {
  console.log("Refreshing Discord token...");
  const tokenResult = await request("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID!,
      client_secret: process.env.VITE_DISCORD_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const tokenData = await tokenResult.body.json();
  console.log("New token data:", tokenData);

  if (tokenData.error) {
    throw new Error(`Failed to refresh token: ${tokenData.error}`);
  }

  const { access_token, refresh_token, token_type, expires_in } = tokenData;
  const updated_at = new Date().toISOString();

  await supabase
    .from("discord_accounts")
    .update({
      access_token,
      refresh_token,
      token_type,
      expires_in,
      updated_at,
    })
    .eq("refresh_token", refreshToken);

  return { access_token, token_type };
}

async function fetchUserConnections(tokenType: string, accessToken: string) {
  console.log("Fetching user connections...");
  const userResult = await request(
    "https://discord.com/api/users/@me/connections",
    {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    },
  );

  const connections = await userResult.body.json();
  console.log("User connections fetched:", connections);
  return connections as {
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
  const steamID32 = Number(steamID64.substr(-16, 16)) - 6_561_197_960_265_728;
  console.log("Converted Steam ID64 to Steam ID32:", steamID32);
  return steamID32;
}

async function deleteSelectedAccounts(
  steamIds: string[],
  interaction: CommandInteraction<CacheType>,
) {
  console.log("Deleting selected accounts:", steamIds);
  for (const id of steamIds) {
    await supabase.from("steam_accounts").delete().eq("steam32Id", id);
  }

  console.log("Selected accounts deleted.");
  await interaction.editReply({
    components: [],
    content: "Selected Steam accounts unlinked",
  });
}

async function checkForDiscordConnection(
  interaction: CommandInteraction<CacheType>,
  reply: InteractionResponse<boolean>,
) {
  console.log("Checking for Discord connection...");
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
      console.log("Discord connection found.");
      isConnected = true;
      await reply.edit({ components: [], content: "Connected!" });
      if (checkInterval) clearInterval(checkInterval);
      await handleUnlinkSteamAccounts(tokens, interaction);
    } else {
      console.log("Discord connection not found yet.");
    }
  };

  checkInterval = setInterval(checkConnection, interval);

  setTimeout(async () => {
    clearInterval(checkInterval);
    if (!isConnected) {
      console.log("Timeout reached without finding Discord connection.");
      await reply.delete();
    }
  }, timeout);
}

async function handleUnlinkSteamAccounts(
  tokens,
  interaction: CommandInteraction<CacheType>,
) {
  console.log("Handling unlink Steam accounts...");
  let { access_token, token_type } = tokens.data;
  const expiresAt =
    new Date(tokens.data.created_at).getTime() + tokens.data.expires_in * 1000;
  const currentTime = Date.now();

  if (currentTime > expiresAt) {
    console.log("Token expired, refreshing...");
    const refreshedTokens = await refreshDiscordToken(
      tokens.data.refresh_token,
    );
    access_token = refreshedTokens.access_token;
    token_type = refreshedTokens.token_type;
  }

  const data = await fetchUserConnections(token_type, access_token);
  if (Array.isArray(data)) {
    console.log("Fetched user connections:", data);
    const steamConnections = data
      .filter(
        (connection) => connection.type === "steam" && connection.verified,
      )
      ?.map((connection) => ({
        ...connection,
        id: steamID64toSteamID32(connection.id),
      }));

    if (steamConnections.length === 0) {
      console.log("No Steam accounts linked.");
      const message =
        "No Steam accounts linked. Add one by following this guide: https://www.minitool.com/news/link-steam-to-discord.html";
      if (interaction.replied) {
        await interaction.editReply(message);
      } else {
        await interaction.reply(message);
      }

      return;
    }

    console.log("Steam connections found:", steamConnections);

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
        console.log("Collector collected selected IDs:", selectedIds);
        await deleteSelectedAccounts(selectedIds, interaction);
      }
    });

    collector?.on("end", async (collected) => {
      console.log("Collector ended, collected items:", collected.size);
      if (collected.size === 0) {
        const message = "Steam account unlinking session expired.";
        if (interaction.replied) {
          await interaction.editReply({
            content: message,
            components: [],
          });
        } else {
          await interaction.reply({
            content: message,
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
    console.log("Executing unlink-steam command...");
    const tokens = await supabase
      .from("discord_accounts")
      .select("access_token, refresh_token, token_type, created_at, expires_in")
      .eq("providerAccountId", Number(interaction.user.id))
      .single();

    if (!tokens.data) {
      console.log("No Discord tokens found, prompting user to link account...");
      const params = new URLSearchParams({
        client_id: process.env.VITE_DISCORD_CLIENT_ID!,
        response_type: "code",
        redirect_uri: process.env.VITE_REDIRECT_URI!,
        scope: "connections identify",
      });

      const oauth2URL = `https://discord.com/oauth2/authorize?${params.toString()}`;

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

    console.log(
      "Discord tokens found, proceeding to handle unlink Steam accounts...",
    );
    await handleUnlinkSteamAccounts(tokens, interaction);
  },
} satisfies Command;
