//BaseNode.js

import React from 'react';
import { Handle, Position } from 'reactflow';
import { nodeStyle } from './styles'; 

const BaseNode = ({ id, handles, label, content, inputs, style = {} }) => {
  const combinedStyle = { ...nodeStyle, ...style };

  return (
    <div className={`relative w-full max-w-xs p-4 border border-gray-300 rounded-lg shadow-sm ${combinedStyle}`}>
  {handles.map((handle, index) => (
    <Handle
      key={index}
      type={handle.type}
      position={handle.position}
      id={`${id}-${handle.id}`}
      style={handle.style}
      className="absolute"
    />
  ))}
  <div className="mb-2">
    <span className="text-lg font-semibold">{label}</span>
  </div>
  <div className="text-sm text-gray-600">{content}</div>
  {inputs && <div className="mt-4">{inputs}</div>}
</div>
  );
};

export default BaseNode;