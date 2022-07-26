import React from "react"

const Block = (props) => {
  return (
    <div className="w-full bg-picton p-3   items-center grid-cols-12 grid">
      <div className="text-white font-bold text-2xl col-span-2 px-2">
        <h1 className="">Hydrazine</h1>
      </div>
      <div className="text-foam-300 font-bold flex space-x-8 justify-center  col-span-8 px-2 uppercase">
        <a href="https://github.com/jareer12/hydrazine" target={"_blank"}>
          Github
        </a>
        <a>Discord</a>
      </div>
      <div className="text-white flex items-center justify-center text-center font-medium col-span-2 px-2">
        <a
          href="https://github.com/jareer12/hydrazine/releases"
          target={"_blank"}
        >
          Source Code - Github
        </a>
      </div>
    </div>
  );
};

export default Block;
