import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const useNodeEdgeCounts = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }), shallow);

  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  const isDAG = () => {
    const adjacencyList = new Map();

    // Initialize adjacency list
    nodes.forEach((node) => adjacencyList.set(node.id, []));
    edges.forEach((edge) => adjacencyList.get(edge.source).push(edge.target));

    const visited = new Set();
    const recStack = new Set();

    const dfs = (node) => {
      if (!visited.has(node)) {
        visited.add(node);
        recStack.add(node);

        const neighbors = adjacencyList.get(node);
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor) && dfs(neighbor)) {
            return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
      recStack.delete(node);
      return false;
    };

    for (let node of nodes) {
      if (dfs(node.id)) {
        return false;
      }
    }
    return true;
  };

  return { nodeCount, edgeCount, isDAG: isDAG() };
};
