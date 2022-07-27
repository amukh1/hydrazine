import React from 'react'
import GarbageCollector from './garbageCollector.ts'
import { Field, TypeNode } from '../types'
import { Edge, EdgeRemoveChange } from 'react-flow-renderer'

const GC = new GarbageCollector({})
class Hydrogen {
  options: any

  constructor(
    options: {
      verbose?: boolean
    } = {},
  ) {
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

    function edgesToTree() {
      const tree: any = {}
      edges.forEach((edge: Edge) => {
        const { source, target }: Edge = edge
        if (getNodeById(target) && getNodeById(source)) {
          const sourceNode = getNodeById(source)
          const targetNode = getNodeById(target)
          const sourceId = sourceNode.id
          const targetId = targetNode.id
          if (!tree[sourceId]) {
            tree[sourceId] = {
              id: sourceId,
              children: [],
            }
          }
          if (!tree[targetId]) {
            tree[targetId] = {
              id: targetId,
              children: [],
            }
          }
          tree[sourceId].children.push(getNodeById(tree[targetId].id))
        }
      })
      return tree
    }

    function ancestorTree(edges: any) {
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
      }
    }

    const EdgeTree = edgesToTree()
    const Tree = ancestorTree(EdgeTree)

    function getNodeById(id: string) {
      let tree = {}
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.id === id) {
          return node
        }
      }
    }

    function getEdgesByNodeId(id: string) {
      const final: Edge[] = []
      for (let i = 0; i < edges.length; i++) {
        const edge: Edge = edges[i]
        if (edge.source == id || edge.target == id) {
          final.push(edge)
        }
      }

      return edges
    }

    function buildConditions() {
      return {
        $equals: edges.map((edge: Edge) => {
          const tinySource = getNodeById(edge.target)
          switch ((tinySource?.$cinfo || {}).$action || null) {
            case 'if_statement': {
              return {
                $match: tinySource.$cinfo.$fields[0].$match,
                $with: tinySource.$cinfo.$fields[0].$with,
                caseSensitive: false,
              }
            }
          }
        }),
      }
    }

    function buildActions(target: TypeNode) {
      const children = getEdgesByNodeId(target.id)
      return target.$cinfo?.$fields
        ? Array.isArray(target.$cinfo.$fields)
          ? ((target.$cinfo || {}).$fields || []).map((field: Field) => {
              return {
                $type: target.$cinfo.$action,
                $value: field.$value,
                $query: field?.$query,
                $callbacks: children.map((child: Edge) => {
                  if (child.source == target.id) {
                    if (child.target) {
                      return getNodeById(child.target)
                    }
                  }
                }),
              }
            })
          : []
        : []
    }

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      const source = getNodeById(edge.source)
      const target = getNodeById(edge.target)

      switch (source.$cinfo.$action) {
        case 'on_start': {
          if (target) {
            if (target.$cinfo) {
              if (Array.isArray(target.$cinfo.$fields)) {
                final.$cinfo.$onInitListeners.push({
                  $type: 'process',
                  $conditions: buildConditions(),
                  $actions: buildActions(target),
                })
              }
            }
          }
          break
        }
        case 'run_sqlite_query': {
          if (target) {
            if (target.$cinfo) {
              if (Array.isArray(target.$cinfo.$fields)) {
                final.$cinfo.$listeners.push({
                  $type: 'process',
                  $conditions: buildConditions(),
                  $actions: buildActions(target),
                })
              }
            }
          }
          break
        }
        case 'on_message': {
          final.$cinfo.$listeners.push({
            $type: 'text_command',
            $conditions: buildConditions(),
            $actions: buildActions(target),
          })
          break
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

    const cleanCode = GC.clean(final)
    if (options?.verbose) {
      console.log(
        `Compiled Within ${(performance.now() - start).toFixed(
          3,
        )} MilliSeconds(s)`,
      )
    }
    return cleanCode
  }

  clean(content: any) {
    return GC.clean(content)
  }
}

export default new Hydrogen()
