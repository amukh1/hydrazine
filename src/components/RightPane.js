import { useState, useEffect } from "react";
import DB from "../module/database";

const Block = (props) => {
  var node = {};
  const data = props.options || {};
  const id = (((data || {}).target || {}).dataset || {}).id;
  const innerText = ((data || {}).target || {}).innerText;

  console.log(data);
  console.log(DB.get("init"));

  if (DB.get(`$node_${id}`)) {
    var node = DB.get(`$node_${id}`);
    console.log(node);
  } else {
    DB.set(`$node_${id}`, {
      id: id,
      label: innerText,
      $cinfo: {
        type: "slash_command",
      },
    });
  }

  const [slashCommand, setSlashCommand] = useState(node.$cinfo.type);

  const label = node.label;
  return (
    <div className="w-full">
      <div className="w-full p-3 h-screen border-l border-scorpion">
        <h1 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
          BUILDER
        </h1>
        <h1 className="font-semibold text-xl text-gray-100">On Message</h1>
        <div className="mt-5 space-y-3">
          {innerText ? (
            <div>
              <h3>Slash Command</h3>
              <input
                className="p-3 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
                value={label}
                onChange={(e) => {
                  setSlashCommand(e.target.value);
                }}
              ></input>
            </div>
          ) : (
            false
          )}
          {id ? (
            <div>
              <h3>Unique Id</h3>
              <input
                className="p-3 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
                value={id}
              ></input>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};

export default Block;
