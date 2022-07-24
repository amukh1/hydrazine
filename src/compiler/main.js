class Compiler {
  options;
  constructor(options) {
    this.options = options;
  }
  compile(data, options) {
    console.log(data);
    return true;
  }
}

export default Compiler;
