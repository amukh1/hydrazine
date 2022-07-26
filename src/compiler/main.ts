import { Field } from '../types'

class Hydrogen {
  options: any

  constructor(options: any = {}) {
    this.options = options
  }

  compile(data: any, options: any) {
    const start = performance.now()
    const final: any = {
      $cinfo: {
        $onInitListeners: [],
        $listeners: [],
        $actions: [],
      },
    }

    const nodes = data?.nodes
    const edges = data?.edges

    console.log(nodes)
    console.log(edges)

    function getNodeById(id) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.id === id) {
          return node
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

      switch (source.$cinfo.$action) {
        case 'on_start': {
          if (target.$cinfo) {
            final.$cinfo.$onInitListeners.push({
              $type: 'process',
              $actions: ((target.$cinfo || {}).$fields || []).map(
                (field: Field) => {
                  return {
                    $type: target.$cinfo.$action,
                    $value: field.$value,
                  }
                },
              ),
            })
          }
        }
        case 'on_message': {
          final.$cinfo.$listeners.push({
            $type: 'text_command',
            $conditions: {
              $equals: edges.map((edge) => {
                const tinySource = getNodeById(edge.target)
                switch (tinySource.$cinfo.$action) {
                  case 'if_statement': {
                    return {
                      $match: tinySource.$cinfo.$fields[0].$match,
                      $with: tinySource.$cinfo.$fields[0].$with,
                      caseSensitive: false,
                    }
                  }
                }
              }),
            },
            $actions: ((target.$cinfo || {}).$fields || []).map(
              (field: Field) => {
                return {
                  $type: target.$cinfo.$action,
                  $value: field.$value,
                }
              },
            ),
          })
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const action = node.$cinfo?.$action

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

    if (options?.verbose) {
      console.log(
        `Compiled Within ${(performance.now() - start).toFixed(
          3,
        )} MilliSeconds(s)`,
      )
    }

    console.log(final)
    return final
  }
}

export default new Hydrogen()
