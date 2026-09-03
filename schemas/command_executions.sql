-- Discord Snowflakes are 64-bit unsigned identifiers, not integers, so we must represent them as TEXT

CREATE TABLE CommandExecutions(
  id INTEGER PRIMARY KEY,
  interaction_id TEXT NOT NULL,
  discord_user_id TEXT NOT NULL,
  interaction_context INTEGER NOT NULL, -- 0 = GUILD, 1 = BOT_DM, 2 = PRIVATE_CHANNEL 
  guild_id TEXT, -- can be null if the command was executed in a DM
  channel_id TEXT, -- can be null if the command was executed in a DM
  command_name TEXT NOT NULL,
  command_type INTEGER NOT NULL, -- 1 = CHAT_INPUT, 2 = USER, 3 = MESSAGE, 4 = PRIMARY_ENTRY_POINT
  target_id TEXT,
  message_id TEXT,
  resolved JSON TEXT,
  options JSON TEXT,
  executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (interaction_id)
)