import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="w-full max-w-xs p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <div className="mb-4">
        <span className="text-xl font-bold text-gray-800">Input</span>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name:</span>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            aria-label="Input name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Type:</span>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            aria-label="Input type"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
};
