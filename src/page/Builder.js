import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";

import CodeCompiler from "../compiler/main";
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
    console.log(this);
    let randId = Module.randomString(16);
    options["id"] = randId;
    options["color"] = options.color || "picton";
    options[
      "className"
    ] = `bg-gradient-to-r bg-shark-600 border-${options.color} border border-dashed text-gray-200 uppercase font-bold text-xs`;
    setNodes((nodes) => {
      return [...nodes, options];
    });
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodesClick = useCallback((node) => {
    console.log(node);
    console.log(nodes);
    FireRightPanel({ id: node.target.dataset.id, $cinfo: node.target.$cinfo });
  });

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      console.log(connection);
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
    console.log(res);
  }

  function FireRightPanel(options) {
    setRightPanelData(options);
  }

  return (
    <>
      <Header />
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
                        label: "onMessage",
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
              onEdgesChange={onEdgesChange}
              fitView
            />
          </div>
        </div>
        <div className="col-span-2">
          <RightPane options={RightPanelData} />
        </div>
      </div>
    </>
  );
}

export default Flow;
