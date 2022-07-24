import { useState, useEffect } from "react";
import DB from "../module/database";

const Block = (props) => {
  var node = {};
  const data = props.options || {};
  const id = (((data || {}).target || {}).dataset || {}).id;
  const safeType = data.target ? (data.target || {}).getAttribute("type") : "";
  const [fields, setFields] = useState(
    data.target ? (data.target || {}).getAttribute("labels") : ""
  );

  console.log(data);
  if (DB.get(`$node_${id}`)) {
    node = DB.get(`$node_${id}`);
    console.log(node);
  } else {
    node = DB.set(`$node_${id}`, {
      id: id,
      $cinfo: {
        type: safeType,
      },
    });
  }

  console.log(DB.get(`$nodes`));
  return (
    <div className="w-full">
      <div className="w-full p-3 h-screen border-l border-scorpion">
        <h1 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
          BUILDER
        </h1>
        <h1 className="font-semibold text-xl text-gray-100">{safeType}</h1>
        <div className="mt-5 space-y-3">
          {safeType ? (
            <div>
              <h3>Type</h3>
              <input
                disabled
                className="p-3 opacity-90 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
                value={safeType}
              ></input>
            </div>
          ) : (
            false
          )}
          {id ? (
            <div>
              <h3>Unique Id</h3>
              <input
                disabled
                className="p-3 opacity-90 bg-shark-400 border-space-700 border-2 rounded-lg w-full"
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
