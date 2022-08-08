import colors from 'colors/safe'

export default function main(msg: any, callback: any, options: any) {
  // msg.channel.send('Handler works')
  switch (callback.$type) {
    case 'message_reply': {
      try {
        msg.reply(options.cleanMsg)
      } catch (err) {
        colors.red(`[${new Date().getTime()}] Failed To Reply: ${err}`)
      }
    }
    case 'message_react': {
      try {
        msg.react(callback.$value)
      } catch (err) {
        console.log(
          colors.red(`[${new Date().getTime()}] Failed To React: ${err}`),
        )
      }
    }
    case 'message_delete': {
      try {
        msg.delete()
      } catch (err) {
        console.log(
          colors.red(`[${new Date().getTime()}] Failed To Delete: ${err}`),
        )
      }
    }
  }
}
