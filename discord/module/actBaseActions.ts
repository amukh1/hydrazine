import sqlite3 from 'sqlite3'
import formatMessage from '../module/formatMessage'

const db = new sqlite3.Database(':memory:')

export default function main(action: any) {
  switch (action.$type) {
    case 'console_log': {
      console.log(formatMessage(action.$value))
      break
    }
    case 'console_warn': {
      console.warn(formatMessage(action.$value))
      break
    }
    case 'run_sqlite_query': {
      db.serialize(() => {
        db.run(action.$query, function (err: any, rows: any) {
          const $ERROR: any = err
          const $RESULT: any = rows
          if (action.$callbacks) {
            action.$callbacks.forEach((callback: any) => {
              main(callback)
            })
          }
        })
      })

      db.close()
      break
    }
  }
}
