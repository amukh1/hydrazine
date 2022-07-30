import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'

import formatMessage from '../module/formatMessage'
import actBaseActions from '../module/actBaseActions'
import discordClientActions from '../module/discordClientActions'
import fs from 'fs'

const config: any = JSON.parse(
  fs.readFileSync(`../engine/${fs.readdirSync('./engine')[0]}`, 'utf-8'),
)

const envs = Object.keys(config?.$ENV || {})
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

if (config.$cinfo) {
  for (let i = 0; i < config.$cinfo.$onInitListeners.length; i++) {
    const listener = config.$cinfo.$onInitListeners[i]
    const actions = listener.$actions
    switch (listener.$type) {
      case 'process': {
        for (let j = 0; j < actions.length; j++) {
          const action = actions[j]
          console.log(action)
          actBaseActions(action)
          discordClientActions(action, {
            client: client,
          })
        }
        break
      }
      case 'on_client_ready': {
        client.on('ready', () => {
          actions.forEach((action: any) => {
            actBaseActions(action)
          })
        })
        break
      }
    }
  }
}

if (config.$cinfo) {
  for (let i = 0; i < envs.length; i++) {
    const env = envs[i]
    const value = config?.$ENV[env]
    process.env[env] = value
  }
}

if (config.$cinfo) {
  for (let i = 0; i < config.$cinfo.$listeners.length; i++) {
    const event = config.$cinfo.$listeners[i]
    const checkpoints = event.$checkpoints

    switch (event.$type) {
      case 'text_command':
        client.on('messageCreate', async (message) => {
          if (message.author.bot) return
          for (let i = 0; i < checkpoints.length; i++) {
            const checkpoint = checkpoints[i]
            const conditions = checkpoint.$conditions

            const equals = Object.keys(conditions.$equals)
            const cleanMsg = formatMessage(message.content, {
              $MSGCONTENT: message.content,
              $MSGID: message.id,
              $MESSAGEAUTHOR: message.author.username,
              $MSGUSERID: message.author.id,
              $MSGUSERDISCRIM: message.author.discriminator,
              $MSGUSERAVATAR: message.author.avatarURL,
              $MSGUSERMENTION: message.author.toString(),
              $MSGUSERMENTIONID: message.author.id,
            })
          }
        })
    }
  }
}

client.login(process.env.TOKEN).then((token) => {
  const PRESENCE: any = config.$GLOBAL?.$PRESENCE
  client.user.setActivity(PRESENCE)
  client.user.setPresence({
    status: 'online',
  })
})
