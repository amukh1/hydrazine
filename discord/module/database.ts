import colors from 'colors/safe'
import sqlite3 from 'sqlite3'
import fs from 'fs'

const db = new sqlite3.Database(
  process.env.DATABASE_PATH || `../database/main.db`,
)

class Database {
  constructor() {
    this.init()
  }
  init() {
    const sqls = fs.readdirSync(`../sql`)
    sqls.forEach((sql) => {
      const query = fs.readFileSync(`../sql/${sql}`, 'utf-8')
      db.all(query, function (this, err) {
        if (err) {
          console.log(colors.red(`Failed to Initialize Query ${sql}: ${err}`))
        } else {
          console.log(colors.green(`Successfuly Initialized Query ${sql}`))
        }
      })
    })
  }
}

export default Database
