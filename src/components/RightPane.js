import { useState, useEffect } from "react";

const Block = (props) => {
  console.log(props);
  return (
    <div className="w-full">
      <div className="w-full p-3 h-screen border-l border-scorpion">
        <h1 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
          BUILDER
        </h1>
        <h1 className="font-semibold text-xl text-gray-100">On Message</h1>
      </div>
    </div>
  );
};

export default Block;
