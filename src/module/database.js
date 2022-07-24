class Database {
  constructor() {
    this.data = {};
  }
  set(key, value) {
    this.data[key] = value;
    return value;
  }
  get(key) {
    return this.data[key];
  }
}

export default new Database();
