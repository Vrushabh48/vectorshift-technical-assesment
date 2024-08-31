import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        width: '80px',
        height: '80px',
        display: 'flex',
        flexDirection: 'column', // Arrange icon and label vertically
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: '#FFFFFF', // White background
        border: '1px solid #E0E0E0', // Light border
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transitions
      }}
      draggable
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}  // Light gray on hover
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}  // Revert to white on leave
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}  // Shrink on click
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}  // Reset scale on release
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: '24px', color: '#6B7280' }} /> 
      <span style={{ color: '#6B7280', fontSize: '12px', marginTop: '8px' }}>{label}</span>
    </div>
  );
};
