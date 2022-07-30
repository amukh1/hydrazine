import formatMessage from '../module/formatMessage'
import client from '../src/client'

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
    }
    case 'set_activity': {
      if (client) {
        if (client.user) {
          if (client.user.setActivity) {
            client.user.setActivity(action.$value)
          }
        }
      }
      break
    }
  }
}
