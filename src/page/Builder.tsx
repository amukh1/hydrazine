import React from "react"
import DiscordFile from "../resources/discordBotIndex.txt";
import { NodeElement, TypeNode } from "../types/index"
import ReactFlow, {
  MiniMap,
  addEdge,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import { useRef, useEffect, useCallback, useState } from "react";

import ConnectionLine from "../components/ConnectionLine.tsx";
import Header from "../components/Header.tsx";
import Block from "../components/Blocks.tsx";

import ExportFile from "../module/export_file.ts"
import ExportZip from "../module/export_zip.ts"
import Hydrogen from "../compiler/main.ts";
import Module from "../module/main.ts";

function Flow() {
  const initialEdges = [];
  const initialNodes = [];

  const [nodes, setNodes]: any = useState(initialNodes);
  const [edges, setEdges]: any = useState(initialEdges);

  const [rightUniqueId, setRightUniqueId] = useState("");
  // const rightNode: TypeNode = getNodeById(rightUniqueId);

  function randomPosition() {
    return Math.floor(Math.random() * 250)
  }

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

  const onNodeClick: any = (node: NodeElement) => {
    setRightUniqueId(node.target.dataset.id)
  }

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds: any) => addEdge(connection, eds));
    },
    [setEdges]
  );

  function exportCode() {
    const output = Hydrogen.compile({
      nodes: nodes,
      edges: edges,
    }, { verbose: true });

    fetch(DiscordFile)
      .then(r => r.text())
      .then(text => {
        console.log(output);
        ExportZip("hydrazine.zip",
          [
            { content: JSON.stringify(output, null, 4), name: "./template/template.ts" },
            { content: text, name: "./src/index.ts" }
          ]
        );
      });
  }

  function saveLocalCopy() {
    ExportFile("hydrazine.hydro", JSON.stringify({
      nodes: nodes,
      edges: edges
    }));
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
                const node = getNodeById(rightUniqueId);
                const newNodes: TypeNode[] = nodes;
                const newNode: TypeNode = node;
                const unique: TypeNode[] = [];
                const ids: string[] = [];

                // newNode.data[field.$name] = e.target.value; // Set the node's innerText to label value
                try {
                  if (newNode.$cinfo.$fields) {
                    newNode.$cinfo.$fields[i].$value = e.target.value;
                  }
                } catch {
                  console.error(`Unable to change value forn ${field.$name}`);
                }

                newNodes.push(newNode);
                for (i = newNodes.length - 1; i > 0; i--) {
                  const node: TypeNode = newNodes[i];
                  if (!ids.includes(node.id)) {
                    unique.push(node);
                    ids.push(node.id);
                  }
                }

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

    setRightUniqueId(node.id)
    setFields(final);
  }

  const fileInput: any = useRef();
  const reader = new FileReader();

  function localFileChange(event: any) {
    const file = event.target.files[0];
    reader.onload = function (event: any) {
      try {
        const data = JSON.parse(event.target.result) || {};
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch {
        console.error("Local file is not a valid JSON file");
      }
    };

    reader.readAsText(file);
  }

  const localClick = () => {
    try {
      fileInput?.current?.click();
    } catch { }
  }



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
                        $action: "on_start",
                      },
                      position: { x: randomPosition(), y: randomPosition() },
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
                      position: { x: randomPosition(), y: randomPosition() },
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
                        $action: "on_message",
                      },
                      position: { x: randomPosition(), y: randomPosition() },
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
                      position: { x: randomPosition(), y: randomPosition() },
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
                      $cinfo: {
                        $action: "message_react",
                        $fields: [
                          {
                            $type: "string",
                            $name: "Content",
                            $placeholder: ":joy:",
                            $value: "",
                          },
                        ],
                      },
                      position: { x: randomPosition(), y: randomPosition() },
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
                      $cinfo: {
                        $action: "message_reply",
                        $fields: [
                          {
                            $type: "string",
                            $name: "Content",
                            $placeholder: "Hello, $AUTHOR_TAG. I'm $CLIENT_NAME",
                            $value: "",
                          },
                        ],
                      },
                      data: { label: "Reply" },
                      position: { x: randomPosition(), y: randomPosition() },
                    })
                  }
                />
                <Block
                  text="Set Presence"
                  color="picton"
                  desc="Set bot presence."
                  onClick={() =>
                    addNode({
                      color: "picton",
                      type: "output",
                      $cinfo: {
                        $action: "set_presence",
                        $fields: [
                          {
                            $type: "string",
                            $name: "name",
                            $placeholder: "Created With Hydrazine.",
                          },
                          {
                            $type: "string",
                            $name: "type",
                            $placeholder: "PLAYING",
                          },
                        ],
                      },
                      data: { label: "setPresence" },
                      position: { x: randomPosition(), y: randomPosition() },
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
                      $cinfo: {
                        $action: "if_statement",
                        $fields: [{
                          $match: "",
                          $with: ""
                        }]
                      },
                      position: { x: randomPosition(), y: randomPosition() },
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
                      position: { x: randomPosition(), y: randomPosition() },
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
                      $cinfo: {
                        $action: "console_warn",
                        $fields: [
                          {
                            $type: "string",
                            $name: "Message",
                            $placeholder: "Process Started with Process Id $PROCESS_ID at $DATE_LOCASETIMESTRING",
                            $value: "",
                          },
                        ],
                      },
                      data: { label: "console.log()" },
                      position: { x: randomPosition(), y: randomPosition() },
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
                        $fields: [
                          {
                            $type: "string",
                            $name: "MySQL Query",
                            $placeholder: "SELECT * FROM users",
                            $value: "",
                          },
                        ],
                      },
                      data: { label: "MySQL Query" },
                      position: { x: randomPosition(), y: randomPosition() },
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
          <div style={{ height: "100vh" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              connectionLineComponent={ConnectionLine}
              fitView
            >
              <Background gap={20} size={1} />
              <MiniMap
                maskColor="transparent"
                nodeStrokeWidth={0}
                nodeBorderRadius={10}
                nodeColor={nodeColor}
                nodeStrokeColor={nodeColor}
                className={`bg-shark-500 rounded-lg shadow-lg border-shark-400 border-2 shadow-shark-600`}
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
                  <div className="space-y-2 w-full mt-3">
                    <button
                      onClick={saveLocalCopy}
                      className={`shadow shadow-shark-400 bg-shark-400 rounded-lg font-bold w-full p-3 text-white`}
                    >
                      Save Local Copy
                    </button>
                    <input type="file" onChange={localFileChange} style={{ "display": "none" }} ref={fileInput} />
                    <button
                      onClick={localClick}
                      className={`shadow shadow-shark-400 bg-shark-400 rounded-lg font-bold w-full p-3 text-white`}
                    >
                      Load Project
                    </button>
                    <button
                      onClick={exportCode}
                      className={`shadow shadow-picton bg-picton rounded-lg font-bold w-full p-3 text-white`}
                    >
                      Export
                    </button>
                  </div>
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
