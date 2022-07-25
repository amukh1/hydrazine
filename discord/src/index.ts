import { ActivityOptions, Client, GatewayIntentBits } from 'discord.js'
import config from '../template/template'

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

for (let i = 0; i < config.$cinfo.$listeners.length; i++) {
  const event = config.$cinfo.$listeners[i]
  switch (event.$type) {
    case 'text_command':
      client.on('messageCreate', async (message) => {
        console.log(message)
      })
  }
}

client.login('token').then((token) => {
  const PRESENCE: any = config.$GLOBAL?.$PRESENCE
  client.user.setActivity(PRESENCE)
  client.user.setPresence({
    status: 'online',
  })
})
