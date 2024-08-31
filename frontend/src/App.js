import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="p-4 space-y-4">
  <PipelineToolbar />
  <PipelineUI />
  <SubmitButton />
</div>

  );
}

export default App;
