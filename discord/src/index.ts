import formatMessage from '../module/formatMessage'
import formatConsoleLog from '../module/formatConsoleLog'

import { ActivityOptions, Client, GatewayIntentBits } from 'discord.js'
import config from '../template/template'

const envs = Object.keys(config?.$ENV || {})
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

for (let i = 0; i < config.$cinfo.$onInitListeners.length; i++) {
  const listener = config.$cinfo.$onInitListeners[i]
  const actions = listener.$actions
  switch (listener.$type) {
    case 'process':
      for (let j = 0; j < actions.length; j++) {
        const action = actions[j]
        switch (action.$type) {
          case 'console_log':
            console.log(formatConsoleLog(action.$value))
          case 'console_warn':
            console.warn(formatConsoleLog(action.$value))
        }
      }
    case 'clieant_ready':
      client.on('ready', () => {
        // Do Something
      })
  }
}

for (let i = 0; i < envs.length; i++) {
  const env = envs[i]
  const value = config?.$ENV[env]
  process.env[env] = value
}

for (let i = 0; i < config.$cinfo.$listeners.length; i++) {
  const event = config.$cinfo.$listeners[i]
  const checkpoints = event.$checkpoints

  switch (event.$type) {
    case 'text_command':
      client.on('messageCreate', async (message) => {
        for (let i = 0; i < checkpoints.length; i++) {
          const checkpoint = checkpoints[i]
          const conditions = checkpoint.$conditions

          const equals = Object.keys(conditions.$equals)
          const cleanMsg = formatMessage(message.content, {
            $MSGCONTENT: message.content,
          })

          console.log(cleanMsg)
        }
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
