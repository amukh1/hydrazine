import 'dotenv/config'
import client from './client'

import formatMessage from '../module/formatMessage'
import actBaseActions from '../module/actBaseActions'
import discordClientActions from '../module/discordClientActions'
import fs from 'fs'

const config: any = JSON.parse(
  fs.readFileSync(`../engine/${fs.readdirSync('./engine')[0]}`, 'utf-8'),
)

const envs = Object.keys(config?.$ENV || {})

if (config.$cinfo) {
  for (let i = 0; i < config.$cinfo.$onInitListeners.length; i++) {
    const listener = config.$cinfo.$onInitListeners[i]
    const actions = listener.$actions
    switch (listener.$type) {
      case 'process': {
        for (let j = 0; j < actions.length; j++) {
          const action = actions[j]
          actBaseActions(action)
          discordClientActions(action)
        }
        break
      }
      case 'on_client_ready': {
        client.on('ready', () => {
          actions.forEach((action: any) => {
            actBaseActions(action)
            discordClientActions(action)
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
  for (let i = 0; i < config.$cinfo.$onInitListeners.length; i++) {
    const event = config.$cinfo.$onInitListeners[i]
    const callbacks = event.$actions || []

    switch (event.$type) {
      case 'text_command': {
        client.on('ready', () => {
          client.on('messageCreate', async (message) => {
            if (message.author.bot) return
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i]
              const conditions = callback.$conditions

              const equals = Object.keys(conditions?.$equals || {}) || []
              const cleanMsg = formatMessage(callback.$value, {
                MSGCONTENT: message.content,
                MSGID: message.id,
                MSGAUTHOR: message.author.tag,
                MESSAGEAUTHOR: message.author.username,
                MSGUSERID: message.author.id,
                MSGUSERDISCRIM: message.author.discriminator,
                MSGUSERAVATAR: message.author.avatarURL,
                MSGUSERMENTION: message.author.toString(),
                MSGUSERMENTIONID: message.author.id,
              })

              console.log(callback.$value)
              switch (callback.$type) {
                case 'message_reply': {
                  message.reply(cleanMsg)
                }
                case 'message_react': {
                  try {
                    message.react(callback.$value)
                  } catch {
                    // do nothing
                  }
                }
              }
            }
          })
        })
        break
      }
    }
  }
}

client.login(process.env.TOKEN).then((token) => {
  const PRESENCE: any = config.$GLOBAL?.$PRESENCE
  client.user.setActivity(PRESENCE)
  client.user.setPresence({
    status: 'idle',
  })
})
