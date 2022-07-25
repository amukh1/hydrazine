import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Background,
  useReactFlow,
  applyEdgeChanges,
  ReactFlowProvider,
  applyNodeChanges,
} from "react-flow-renderer";

import ConnectionLine from "../components/ConnectionLine";
import Header from "../components//Header";
import Block from "../components/Blocks";
import Module from "../module/main";

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#E34949";
    case "default":
      return "#00ff00";
    case "output":
      return "#4598E4";
    default:
      return "#eee";
  }
};

function Flow() {
  const initialEdges = [];
  const initialNodes = [];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  function addNode(options) {
    let randId = Module.randomString(16);
    options["id"] = randId;
    options["color"] = options.color || "picton";
    options[
      "className"
    ] = `bg-gradient-to-r bg-shark-600 border-${options.color} border border-dashed text-gray-200 font-bold text-xs`;
    setNodes((nodes) => {
      return [...nodes, options];
    });
  }

  const [rightUniqueId, setRightUniqueId] = useState(null);
  const [rightLabel, setRightLabel] = useState(null);

  function getNodeById(id) {
    return nodes.find((node) => node.id === id);
  }

  function getNodeIndexById(id) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === id) {
        return i;
      }
    }
  }

  function FireRightPanel(node) {
    let data = getNodeById(node.target.dataset.id);

    setRightUniqueId(data.id);
    setRightLabel(data.data.label);
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodesClick = useCallback(
    (node) => {
      FireRightPanel(node);
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          node.data = {
            ...node.data,
            label: rightLabel,
          };
        }
        return node;
      })
    );
  }, [rightLabel, setNodes]);

  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="space-y-3 h-screen  p-3 overflow-visible border-r border-scorpion ">
            <section className="">
              <h3 className="mb-1">Event Listeners</h3>
              <div className="space-y-2 ">
                <Block
                  text="On Message"
                  desc="Fire and event when a message is sent."
                  color="cinna"
                  onClick={() =>
                    addNode({
                      type: "input",
                      color: "cinna",
                      data: {
                        label: "onMessage",
                      },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
                <Block
                  text="On Slash Command"
                  desc="Listen for slash(/) commands."
                  color="cinna"
                  onClick={() =>
                    addNode({
                      type: "input",
                      color: "cinna",
                      data: {
                        myCustomProps: "test",
                        label: "onSlashCommand",
                      },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
              </div>
            </section>
            <section>
              <h3 className="mb-1">Actions</h3>
              <div className="space-y-2">
                <Block
                  text="React"
                  desc="React to a message with an emoji."
                  color="picton"
                  onClick={() =>
                    addNode({
                      color: "picton",
                      type: "output",
                      data: { label: "React" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
                <Block
                  text="Reply"
                  color="picton"
                  desc="Reply to the sent message."
                  onClick={() =>
                    addNode({
                      color: "picton",
                      type: "output",
                      data: { label: "Reply" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
              </div>
            </section>
            <section>
              <h3 className="mb-1">Logic</h3>
              <div className="space-y-2">
                <Block
                  text="If"
                  desc="Check whether a condition is true"
                  color="royal"
                  onClick={() =>
                    addNode({
                      color: "royal",
                      data: { label: "If <condition>" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
              </div>
            </section>
            <section>
              <h3 className="mb-1">Process</h3>
              <div className="space-y-2">
                <Block
                  text="Console Log"
                  desc="Log something to the node console."
                  color="emerald"
                  onClick={() =>
                    addNode({
                      type: "output",
                      color: "emerald",
                      data: { label: "console.log()" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
                <Block
                  text="Console Warn"
                  desc="Log a warning into the node console."
                  color="emerald"
                  onClick={() =>
                    addNode({
                      type: "output",
                      color: "emerald",
                      data: { label: "console.log()" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
              </div>
            </section>
            <section>
              <h3 className="mb-1">Database - SQLite3</h3>
              <div className="space-y-2">
                <Block
                  text="Run Query"
                  desc="Run a MySQL Query."
                  color="amethyst"
                  onClick={() =>
                    addNode({
                      color: "amethyst",
                      data: { label: "console.log()" },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
              </div>
            </section>
          </div>
        </div>
        <div
          className={`w-full ${rightUniqueId ? `col-span-8` : `col-span-10`}`}
        >
          <div style={{ height: "100%" }}>
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                defaultNodes={[]}
                onConnect={onConnect}
                onNodeClick={onNodesClick}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineComponent={ConnectionLine}
                fitView
              >
                <Background variant="dots" gap={20} size={1} />
                <MiniMap
                  nodeColor={nodeColor}
                  nodeStrokeWidth={3}
                  className="bg-shark-300 rounded-lg shadow-lg border-dashed border-space-600 border-2 shadow-shark-600"
                  maskColor="#383D41"
                />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
        {rightUniqueId ? (
          <div className="col-span-2">
            <div className="w-full">
              <div className="w-full p-3 border-l border-scorpion">
                <h1 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                  BUILDER
                </h1>
                <h1 className="font-semibold text-xl text-gray-100">{""}</h1>
                <div className="mt-5 space-y-3">
                  {rightUniqueId ? (
                    <div>
                      <h3 className="font-semibold">Unique Key</h3>
                      <input
                        disabled
                        className="p-3 opacity-90 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
                        value={rightUniqueId}
                      ></input>
                    </div>
                  ) : (
                    false
                  )}
                  {rightLabel ? (
                    <div>
                      <h3 className="font-semibold">Label</h3>
                      <input
                        onChange={(e) => {
                          setRightLabel(e.target.value);
                          console.log(nodes);

                          const node = getNodeById(rightUniqueId);
                          const newNode = node;

                          const nodeIndex = getNodeIndexById(rightUniqueId);
                          const newNodes = [...nodes];
                          newNodes.pop(nodeIndex);

                          newNode.id = rightUniqueId;
                          newNode.data.label = e.target.value;
                          newNodes.push({
                            ...newNode,
                          });

                          setNodes(newNodes);
                        }}
                        className="p-3 opacity-90 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
                        value={rightLabel}
                      ></input>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </>
  );
}

export default Flow;
