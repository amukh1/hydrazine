import formatMessage from '../module/formatMessage'

export default function main(action: any) {
  switch (action.$type) {
    case 'console_log':
      console.log(formatMessage(action.$value))
    case 'console_warn':
      console.warn(formatMessage(action.$value))
  }
}
