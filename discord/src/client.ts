import Discord from 'discord.js'

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
  ],
})

export default client
