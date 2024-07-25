import process from "node:process";
import { URL } from "node:url";
import { Client, GatewayIntentBits } from "discord.js";
import { initServer } from "./initServer.ts";
import { loadCommands, loadEvents } from "./util/loaders.ts";
import { registerEvents } from "./util/registerEvents.ts";

// Initialize the client
console.log("Initializing the client...");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load the events and commands
console.log("Loading events...");
const events = await loadEvents(new URL("events/", import.meta.url));
console.log("Events loaded:", events);

console.log("Loading commands...");
const commands = await loadCommands(new URL("commands/", import.meta.url));
console.log("Commands loaded:", commands);

// Register the event handlers
console.log("Registering event handlers...");
registerEvents(commands, events, client);
console.log("Event handlers registered.");

// Create the express server
console.log("Initializing server...");
initServer();
console.log("Server initialized.");

// Login to the client
console.log("Logging in to the client...");
void client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => {
    console.log("Client logged in successfully.");
  })
  .catch((error) => {
    console.error("Error logging in to the client:", error);
  });
