import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { useNodeEdgeCounts } from './nodeEdgeCounts';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const { nodeCount, edgeCount, isDAG } = useNodeEdgeCounts();

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: type };
    return nodeData;
  }
//new part
  useEffect(() => {
    console.log('Number of nodes:', nodes.length);
    console.log('Number of edges:', edges.length);
    console.log('Is DAG:', isDAG);
  }, [nodes, edges, isDAG]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} className="w-screen h-[70vh] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>



        <div className="absolute bottom-5 right-5 p-5 bg-white shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Statistics</h4>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="py-2 px-3 font-medium text-gray-700 border-b">Node Count</td>
                <td className="py-2 px-3 text-gray-900 border-b">{nodeCount}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-gray-700 border-b">Edge Count</td>
                <td className="py-2 px-3 text-gray-900 border-b">{edgeCount}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-gray-700">Is DAG</td>
                <td className="py-2 px-3 text-gray-900">{isDAG ? 'True' : 'False'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}
