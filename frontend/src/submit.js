// submit.js
import { useNodeEdgeCounts } from './nodeEdgeCounts';

export const SubmitButton = () => {
    const { nodeCount, edgeCount, isDAG } = useNodeEdgeCounts();

    const handleClick = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nodes: nodeCount, edges: edgeCount, isDAG: isDAG }), // Sending the counts as the request body
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          alert(`Number of nodes: ${result.num_nodes}, Number of edges: ${result.num_edges}, Is_DAG: ${result.is_dag}`);
        } catch (error) {
          console.error('Error submitting data:', error);
          alert('Error submitting data. Check the console for details.');
        }
      };

    return (
        <div className='p-2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit" onClick={handleClick}>Submit</button>
        </div>
    );
}
