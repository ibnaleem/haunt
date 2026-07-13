import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("ban")
	.setDescription("Ban a member from the server")
	.addUserOption((opt) =>
		opt.setName("target").setDescription("Member to ban").setRequired(true),
	)
	.addStringOption((opt) =>
		opt.setName("reason").setDescription("Reason for the ban"),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const target = interaction.options.getUser("target", true);
	const reason = interaction.options.getString("reason") ?? "No reason provided";
	await interaction.reply(`Would ban ${target.tag} — ${reason}`);
}
