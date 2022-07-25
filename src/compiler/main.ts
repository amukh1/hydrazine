class Hydrogen {
  options;
  constructor(options) {
    this.options = options;
  }
  compile(data, options) {
    let final = {
      $cinfo: {
        $listeners: [],
        $actions: [],
      },
    };

    const nodes = data?.nodes;
    const edges = data?.edges;

    function getNodeById(id) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === id) {
          return node;
        }
      }
    }
    console.log(nodes);
    console.log(edges);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const action = node.$cinfo?.$action;

      console.log(node);
      console.log(action);

      switch (action) {
        case "on_slash_command":
          final.$cinfo.$listeners.push({
            $checkpoints: [
              {
                $unique_id: node.id,
                $name: "help",
                $type: "slash_command",
                $params: {},
                $conditions: {
                  $equals: [
                    {
                      $match: "$MSGCONTENT",
                      $with: "help",
                      caseSensitive: false,
                    },
                  ],
                },
                $actions: [],
              },
            ],
          });
      }
    }

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const source = getNodeById(edge.source);
      const target = getNodeById(edge.target);

      console.log(target);
      console.log(source);
      console.log(edge);

      switch (edge) {
      }
    }

    return final;
  }
}

export default new Hydrogen();
