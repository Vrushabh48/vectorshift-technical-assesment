import { useNodeEdgeCounts } from './nodeEdgeCounts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SubmitButton = () => {
  const { nodeCount, edgeCount, isDAG } = useNodeEdgeCounts();

  const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', { //backend call
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes: nodeCount, edges: edgeCount, isDAG: isDAG }), //request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      // Used react-toastify for user-friendly notification
      toast.success(`Pipeline parsed successfully! Nodes: ${result.num_nodes}, Edges: ${result.num_edges}, Is DAG: ${result.is_dag ? 'Yes' : 'No'}`);
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data. Please try again.');
    }
  };

  return (
    <div className='p-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type="submit"
        onClick={handleClick}
      >
        Submit
      </button>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}
