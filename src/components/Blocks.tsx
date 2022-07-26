import React from 'react'

const Block = (props) => {
  return (
    <>
      <div
        onClick={props.onClick}
        className="hover:scale-105 duration-300 bg-space cursor-pointer rounded p-3 grid-cols-4 grid gap-1"
      >
        <div
          className={`bg-gradient-to-r h-16 from-${props.color}-500 to-${props.color}-300 rounded`}
        ></div>
        <div className="px-3 col-span-3">
          <h3 className="text-lg text-gray-100 font-semibold ">{props.text}</h3>
          <p className="text-xs text-gray-300">
            {props.description || props.desc}
          </p>
        </div>
      </div>
    </>
  );
};

export default Block;
