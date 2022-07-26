class Database {
  data: any
  constructor() {
    this.data = {}
  }
  set(key: string, value: any) {
    this.data[key] = value
    return value
  }
  get(key: string) {
    return this.data[key]
  }
}

export default new Database()
