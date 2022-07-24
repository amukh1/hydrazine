import React, { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";

import DB from "../module/database";
import CodeCompiler from "../compiler/main";

import ConnectionLine from "../components/ConnectionLine";
import RightPane from "../components/RightPane";
import Header from "../components//Header";
import Block from "../components/Blocks";
import Module from "../module/main";

const Compiler = new CodeCompiler();

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
    ] = `bg-gradient-to-r bg-shark-600 border-${options.color} border border-dashed text-gray-200  font-bold text-xs`;
    setNodes((nodes) => {
      return [...nodes, options];
    });
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodesClick = useCallback((node) => {
    node.target.setAttribute("type", "slash_command");
    setRightPanelData(node);
  });

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

  const [RightPanelData, setRightPanelData] = useState(null);

  function CompileCode() {
    const res = Compiler.compile({
      nodes: nodes,
      edges: edges,
    });
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="space-y-3 w-full p-3 h-screen border-r border-scorpion ">
            <section>
              <h3 className="mb-1">Event Listeners</h3>
              <div className="space-y-2">
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
        <div className="h-screen w-full col-span-8">
          <div style={{ height: "100vh" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={onNodesClick}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              connectionLineComponent={ConnectionLine}
              onEdgesChange={onEdgesChange}
              fitView
            >
              <Background variant="dots" gap={20} size={1} />
              <MiniMap className="bg-shark-300" maskColor="#383D41" />
            </ReactFlow>
          </div>
        </div>
        <div className="col-span-2">
          <RightPane options={RightPanelData} />
        </div>
      </div>
      <Header />
    </>
  );
}

export default Flow;
