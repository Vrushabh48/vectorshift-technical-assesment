// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="w-full max-w-xs p-4 border border-gray-300 rounded-lg shadow-sm">
  <Handle
    type="target"
    position={Position.Left}
    id={`${id}-value`}
  />
  <div className="mb-2">
    <span className="text-lg font-semibold">Output</span>
  </div>
  <div className="space-y-4">
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Name:</span>
      <input 
        type="text" 
        value={currName} 
        onChange={handleNameChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    </label>
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Type:</span>
      <select 
        value={outputType} 
        onChange={handleTypeChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </label>
  </div>
</div>

  );
}
