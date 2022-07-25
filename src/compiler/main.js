class Hydrogen {
  options;
  constructor(options) {
    this.options = options;
  }
  compile(data, options) {
    let final = {};

    const nodes = data?.nodes;
    const edges = data?.edges;

    return {
      code: final,
    };
  }
}

export default new Hydrogen();
