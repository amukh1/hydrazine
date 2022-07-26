class Hydrogen {
  options: any

  constructor(options: any = {}) {
    this.options = options
  }

  compile(data: any, options: any) {
    const final: any = {
      $cinfo: {
        $listeners: [],
        $actions: [],
      },
    }

    const nodes = data?.nodes
    const edges = data?.edges

    function getNodeById(id) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.id === id) {
          return node
        }
      }
    }
    console.log(nodes)
    console.log(edges)

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const action = node.$cinfo?.$action

      console.log(node)
      console.log(action)

      switch (action) {
        case 'on_slash_command': {
          const data: any = {
            $type: 'slash_command',
            $checkpoints: [
              {
                $unique_id: node.id,
                $name: 'help',
                $params: {},
                $conditions: {
                  $equals: [
                    {
                      $match: '$MSGCONTENT',
                      $with: 'help',
                      caseSensitive: false,
                    },
                  ],
                },
                $actions: [],
              },
            ],
          }
          final.$cinfo.$listeners.push(data)
        }
      }
    }

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      const source = getNodeById(edge.source)
      const target = getNodeById(edge.target)

      console.log(target)
      console.log(source)
      console.log(edge)

      switch (edge) {
      }
    }

    return final
  }
}

export default new Hydrogen()
