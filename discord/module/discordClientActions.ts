import formatMessage from '../module/formatMessage'

export default function main(
  action: any,
  options: { extendedLibrary?: any; client?: any } = {},
) {
  switch (action.$type) {
    case 'set_presence': {
      options.client.user.setActivity(action.$value)
      break
    }
  }
}
