import { resolve } from "node:path";
import {
	Client,
	Collection,
	GatewayIntentBits,
	type ChatInputCommandInteraction,
	type SlashCommandBuilder,
} from "discord.js";

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) throw new Error("DISCORD_BOT_TOKEN missing — set it in .env");

interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const commands = new Collection<string, Command>();
const glob = new Bun.Glob("commands/**/*.ts");

for await (const file of glob.scan(".")) {
	const mod = (await import(resolve(file))) as Partial<Command>;
	if (!mod.data || !mod.execute) {
		console.warn(`Skipping ${file}: missing 'data' or 'execute' export`);
		continue;
	}
	commands.set(mod.data.name, mod as Command);
}


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("clientReady", async (c) => {
	const body = commands.map((cmd) => cmd.data.toJSON());
	await c.application.commands.set(body);
	console.log(`Registered ${body.length} slash command(s) as ${c.user.tag} (ID: ${c.user.id})`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(`Error in /${interaction.commandName}:`, err);
		const reply = { content: "Command failed.", ephemeral: true };
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(reply);
		} else {
			await interaction.reply(reply);
		}
	}
});

await client.login(token);