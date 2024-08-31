import React from 'react';
import BaseNode from './BaseNode';

const MergeNode = (props) => {
  const handles = [
    { id: 'input-1', type: 'target', position: 'left', style: { top: '25%' } },
    { id: 'input-2', type: 'target', position: 'left', style: { top: '75%' } },
    { id: 'output-1', type: 'source', position: 'right', style: { top: '50%' } }
  ];

  return (
    <BaseNode
      id={props.id}
      handles={handles}
      label="Merge Node"
      content="This node merges inputs."
      {...props}
    />
  );
};

export default MergeNode;
