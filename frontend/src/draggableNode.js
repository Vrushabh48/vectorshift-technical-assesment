// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
  className={type}
  onDragStart={(event) => onDragStart(event, type)}
  onDragEnd={(event) => (event.target.style.cursor = 'grab')}
  style={{ 
    cursor: 'grab', 
    minWidth: '80px', 
    height: '60px',
    display: 'flex', 
    alignItems: 'center', 
    borderRadius: '8px',
    backgroundColor: '#4F46E5',  // Soft blue/purple tone
    justifyContent: 'center', 
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Soft shadow for depth
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transitions
  }} 
  draggable
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6366F1'}  // Lighter on hover
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}  // Revert on leave
  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}  // Shrink on click
  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}  // Reset scale on release
>
  <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{label}</span>
</div>

    );
  };
  