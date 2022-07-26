import React from 'react'

export default ({ sourceX, sourceY, targetX, targetY }) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#f3f3f3"
        strokeWidth={1}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#f3f3f3"
        r={2}
        stroke="#f3f3f3"
        strokeWidth={1.5}
      />
    </g>
  )
}
