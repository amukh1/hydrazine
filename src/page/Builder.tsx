import DiscordFile from "../resources/discordBotIndex.txt";
import { TypeNode } from "../types/index"
import ReactFlow, {
  MiniMap,
  addEdge,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import React, { useEffect, useCallback, useState } from "react";

import ConnectionLine from "../components/ConnectionLine.tsx";
import Block from "../components/Blocks.tsx";
import Header from "../components/Header.tsx";
import Hydrogen from "../compiler/main.ts";
import Export from "../module/export.ts"
import Module from "../module/main.ts";

import("../scss/tailwinds.scss");
import("../scss/index.scss");

function Flow() {
  const initialEdges = [];
  const initialNodes = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [rightUniqueId, setRightUniqueId] = useState("");
  // const rightNode: TypeNode = getNodeById(rightUniqueId);

  function addNode(options) {
    let randId = Module.randomString(16);
    options["id"] = randId;
    options["color"] = options.color || "picton";
    options[
      "className"
    ] = `bg-gradient-to-r bg-shark-600 border-${options.color} border border-dashed text-gray-200 font-bold text-xs`;
    setNodes((nodes: any) => {
      return [...nodes, options];
    });
  }

  function getNodeById(id: string): TypeNode | any {
    for (let i = 0; i < nodes.length; i++) {
      const node: TypeNode = nodes[i];
      if (node.id === id) {
        return node;
      }
    }
    return false
  }

  function hexToRGBA(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // function getNodeIndexById(id) {
  //   for (let i = 0; i < nodes.length; i++) {
  //     const node = nodes[i];
  //     if (node.id === id) {
  //       return i;
  //     }
  //   }
  // }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
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

  function exportCode() {
    const output = Hydrogen.compile({
      nodes: nodes,
      edges: edges,
    });

    fetch(DiscordFile)
      .then(r => r.text())
      .then(text => {
        const compiled = Export("hydrazine.zip",
          [
            { content: JSON.stringify(output, null, 4), name: "./template/template.ts" },
            { content: text, name: "./src/index.ts" }
          ]
        );
        console.log(output);
        console.log(compiled)
      });
  }

  const nodeColor = (node) => {
    switch (node.color) {
      case "cinna":
        return "#E76464";
      case "emerald":
        return "#6FDD7C";
      case "amethyst":
        return "#B46FDD";
      case "picton":
        return "#60A7E8";
      case "royal":
        return hexToRGBA("#FE8C52", 1);
      default:
        return "#32373C";
    }
  };

  const [fields, setFields] = useState([]);
  function updateFieldComponent() {
    const node: TypeNode = getNodeById(rightUniqueId);
    const nodeFields = node?.$cinfo?.$fields || [];
    const final: any = [];

    for (let i = 0; i < nodeFields.length; i++) {
      const field = nodeFields[i];
      final.push(
        <>
          <div className="mt-2">
            <h3 className="font-semibold">{field.$name}</h3>
            <input
              onChange={(e) => {
                // const node = getNodeById(rightUniqueId);
                const newNodes: TypeNode[] = [...nodes];
                const newNode: TypeNode = node;
                const ids: string[] = [];
                const unique: TypeNode[] = [];

                // newNode.data[field.$name] = e.target.value; // Set the node's innerText to label value
                newNode.$cinfo.$fields[i].$value = e.target.value;
                newNodes.push(newNode);

                for (let i = newNodes.length - 1; i >= 0; i--) {
                  const node: TypeNode = newNodes[i];
                  if (!ids.includes(node.id)) {
                    unique.push(node);
                    ids.push(node.id);
                  }
                }

                console.log(e.target.value);
                setNodes(unique);
              }}
              className={`p-3 opacity-90 bg-shark-400 border-dashed border-picton  shadow-sm border-2 rounded-lg w-full`}
              value={field.$value}
              placeholder={field.$placeholder}
            ></input>
          </div>
        </>
      );
    }

    setFields(final);
  }

  const onNodesClick = (node: TypeNode) => {

    let data = getNodeById(node.target.dataset.id);
    console.log(data.id)
    setRightUniqueId(data?.id);

  };

  useEffect(() => {
    updateFieldComponent();
  }, [rightUniqueId]);

  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-2 overflow-auto">
          <div className="space-y-3 h-screen overflow-auto  p-3 border-r border-shark-400">
            <section className="">
              <h3 className="mb-1">Event Listeners</h3>
              <div className="space-y-2 ">
                <Block
                  text="On Start"
                  desc="Run this in the very beginning of the script."
                  color="cinna"
                  onClick={() =>
                    addNode({
                      type: "input",
                      color: "cinna",
                      data: {
                        label: "onStart",
                      },
                      $cinfo: {
                        $fields: [
                          {
                            $type: "string",
                            $name: "value",
                            $placeholder: "Some Random Value",
                            $value: "",
                          },
                          {
                            $type: "string",
                            $name: "Print",
                            $placeholder: "Print on Start",
                            $value: "$BOTNAME has started",
                          },
                        ],
                        $action: "on_start",
                      },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
                <Block
                  text="On Client Ready"
                  desc="Fire an event when the Discord bot has started."
                  color="cinna"
                  onClick={() =>
                    addNode({
                      type: "input",
                      color: "cinna",
                      data: {
                        label: "onClientReady",
                      },
                      $cinfo: {
                        $action: "on_client_ready",
                      },
                      position: { x: 250, y: 250 },
                    })
                  }
                />
                <Block
                  text="On Message"
                  desc="Fire an event when a message is sent."
                  color="cinna"
                  onClick={() =>
                    addNode({
                      type: "input",
                      color: "cinna",
                      data: {
                        label: "onMessage",
                      },
                      $cinfo: {
                        $action: "on_message_listener",
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
                        label: "onSlashCommand",
                      },
                      $cinfo: {
                        $action: "on_slash_command",
                        $value: "help",
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
                      $cinfo: {
                        $action: "console_log",
                        $fields: [
                          {
                            $type: "string",
                            $name: "Message",
                            $placeholder: "$BOTNAME has started",
                            $value: "",
                          },
                        ],
                      },
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
                      $cinfo: {
                        $action: "run_sqlite_query",
                        $fields: {
                          query: "",
                        },
                      },
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
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              onNodeClick={onNodesClick}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              connectionLineComponent={ConnectionLine}
              fitView
            >
              <Background variant="dots" gap={20} size={1} />
              <MiniMap
                maskColor="#2A2E31"
                nodeStrokeWidth={0}
                nodeBorderRadius={10}
                nodeColor={nodeColor}
                nodeStrokeColor={nodeColor}
                className={`bg-shark-500 rounded-lg shadow-lg  border-shark-400 border-2 shadow-shark-600`}
              />
            </ReactFlow>
          </div>
        </div>
        {rightUniqueId ? (
          <div className="col-span-2 flex flex-wrap w-full">
            <div className="w-full flex flex-wrap">
              <div className="w-full grid-cols-1 grid p-3 border-l  flex-wrap border-shark-400">
                <div className="">
                  <section className="mb-3">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                      BUILDER
                    </h3>
                    <div className="space-y-2 mt-1">
                      <button
                        onClick={exportCode}
                        className={`shadow shadow-picton bg-picton rounded-lg font-bold w-full p-3 text-white`}
                      >
                        Export
                      </button>
                    </div>
                  </section>
                  {rightUniqueId ? (
                    <div>
                      <h3 className="font-semibold">Unique Key</h3>
                      <input
                        disabled
                        className={`p-3 opacity-90 bg-shark-400 border-dashed border-picton shadow-sm border-2 rounded-lg w-full`}
                        value={rightUniqueId}
                      ></input>
                    </div>
                  ) : (
                    false
                  )}
                  {fields.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
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
