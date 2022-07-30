import sqlite3 from 'sqlite3'
import formatMessage from '../module/formatMessage'

const db = new sqlite3.Database('../database/main.db')

export default function main(
  action: any,
  options: { extendedLibrary?: any } = {},
) {
  switch (action.$type) {
    case 'console_log': {
      console.log(formatMessage(action.$value, options.extendedLibrary))
      break
    }
    case 'console_warn': {
      console.warn(formatMessage(action.$value, options.extendedLibrary))
      break
    }
    case 'run_sqlite_query': {
      db.serialize(() => {
        console.log(action.$value)
        db.run(action.$value, (err: any, result: any) => {
          console.log(result)
          console.log(err)
          if (action.$callbacks) {
            action.$callbacks.forEach((callback: any) => {
              if (callback) {
                if (callback.$actions) {
                  callback.$actions.forEach((action: any) => {
                    main(action, {
                      extendedLibrary: {
                        $ERROR: err,
                        $RESULT: result,
                      },
                    })
                  })
                }
              }
            })
          }
        })
      })
      break
    }
  }
}
