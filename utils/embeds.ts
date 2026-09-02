// Stores Discord Embeds for easy access and modification

import { ChatInputCommandInteraction, GuildMember, EmbedBuilder } from 'discord.js';


export function userNotFoundEmbed(interaction: ChatInputCommandInteraction, member: GuildMember | null | undefined ) {

	return new EmbedBuilder()
		.setColor(0xFF0000)
		.setDescription(":x: **Member not found**")
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
		.setFooter({ text: `Member ID: ${member?.id ?? "Unknown"}` })
		.setTimestamp();
}