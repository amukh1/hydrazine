import colors from 'colors/safe'

export default function main(msg: any, callback: any, options: any) {
  // msg.channel.send('Handler works')
  try {
    switch (callback.$type) {
      case 'message_reply': {
        try {
          if (options.cleanMsg) {
            msg.reply(options.cleanMsg)
          }
        } catch (err) {
          colors.red(`[${new Date().getTime()}] Failed To Reply: ${err}`)
        }
        break
      }
      case 'message_react': {
        try {
          msg.react(callback.$value)
        } catch (err) {
          console.log(
            colors.red(`[${new Date().getTime()}] Failed To React: ${err}`),
          )
        }
        break
      }
      case 'message_delete': {
        try {
          msg.delete()
        } catch (err) {
          console.log(
            colors.red(`[${new Date().getTime()}] Failed To Delete: ${err}`),
          )
        }
        break
      }
    }
  } catch (err) {
    console.log(
      colors.red(`[${new Date().getTime()}] Failed To Execute: ${err}`),
    )
  }
}
