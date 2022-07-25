import config from '../template/template'
import { ActivityOptions, Client, GatewayIntentBits } from 'discord.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const ConfiVariables = config.$CONFIGS

const envs = Object.keys(config?.$ENV || {})
const globals = Object.keys(config.$GLOBAL)

for (let i = 0; i < envs.length; i++) {
  const env = envs[i]
  const value = config?.$ENV[env]
  process.env[env] = value
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('messageCreate', async (message) => {
  console.log(message)
})

console.log(null)

client.login('token').then((token) => {
  const PRESENCE: any = config.$GLOBAL?.$PRESENCE
  client.user.setActivity(PRESENCE)
  client.user.setPresence({
    status: 'online',
  })
})
