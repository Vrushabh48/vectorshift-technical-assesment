import { faArrowRight, faFileAlt, faPlay, faFileExport, faSave, faStickyNote, faRobot } from '@fortawesome/free-solid-svg-icons'; // faRobot for LLM icon
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="p-4">
            <div className="mt-5 flex flex-wrap gap-4">
                <DraggableNode type="customInput" label="Input" icon={faArrowRight} />
                <DraggableNode type="llm" label="LLM" icon={faRobot} /> {/* Added LLM node here */}
                <DraggableNode type="customOutput" label="Output" icon={faFileExport} />
                <DraggableNode type="text" label="Text" icon={faFileAlt} />
            </div>
        </div>
    );
};
