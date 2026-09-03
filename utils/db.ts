import { Database } from "bun:sqlite";
import type { ChatInputCommandInteraction } from "discord.js";

export const db = new Database("bot.db");

export function logCommandExecution(interaction: ChatInputCommandInteraction) {
  db.query(`
    INSERT INTO CommandExecutions (
      interaction_id,
      discord_user_id,
      interaction_context,
      guild_id,
      channel_id,
      command_id,
      command_name,
      command_type,
      target_id,
      message_id,
      resolved,
      options
    ) VALUES (
      $interactionId,
      $userId,
      $context,
      $guildId,
      $channelId,
      $commandId,
      $commandName,
      $commandType,
      $targetId,
      $messageId,
      $resolved,
      $options
    )
  `).run({
    $interactionId: interaction.id,
    $userId: interaction.user.id,
    $context: interaction.context,
    $guildId: interaction.guildId,
    $channelId: interaction.channelId,
    $commandId: interaction.commandId,
    $commandName: interaction.commandName,
    $commandType: interaction.commandType,
    $targetId: null,
    $messageId: null,
    $resolved: null,
    $options: JSON.stringify(interaction.options.data),
  });
}