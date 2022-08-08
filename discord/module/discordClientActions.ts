import formatMessage from '../module/formatMessage'
import client from '../src/client'
import colors from 'colors/safe'

export default function main(
  action: any,
  options: { extendedLibrary?: any } = {},
) {
  console.log(action)
  switch (action.$type) {
    case 'set_presence': {
      client?.user?.setPresence({
        status: action.$value,
      })
      console.log(
        colors.green(
          `[${new Date().getTime()}] Set Presence: ${action.$value}`,
        ),
      )
      break
    }

    case 'set_activity': {
      if (client) {
        if (client.user) {
          if (client.user.setActivity) {
            client.user.setActivity({
              name: action.$value,
            })
          }
        }
      }
      console.log(
        colors.green(
          `[${new Date().getTime()}] Set Activity: ${action.$value}`,
        ),
      )
      break
    }
  }
}
