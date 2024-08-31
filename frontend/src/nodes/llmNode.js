// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <div className="relative w-full max-w-xs p-4 border border-gray-300 rounded-lg shadow-sm">
  <Handle
    type="target"
    position={Position.Left}
    id={`${id}-system`}
    style={{ top: `${100 / 3}%` }}
    className="absolute"
  />
  <Handle
    type="target"
    position={Position.Left}
    id={`${id}-prompt`}
    style={{ top: `${200 / 3}%` }}
    className="absolute"
  />
  <div className="mb-2">
    <span className="text-lg font-semibold">LLM</span>
  </div>
  <div>
    <span className="text-sm text-gray-600">This is a LLM.</span>
  </div>
  <Handle
    type="source"
    position={Position.Right}
    id={`${id}-response`}
    className="absolute"
  />
</div>

  );
}
