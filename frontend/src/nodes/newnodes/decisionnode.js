import React from 'react';
import BaseNode from './BaseNode';

const DecisionNode = (props) => {
  const handles = [
    { id: 'input-1', type: 'target', position: 'top', style: { left: '50%' } },
    { id: 'output-yes', type: 'source', position: 'right', style: { top: '25%' } },
    { id: 'output-no', type: 'source', position: 'right', style: { top: '75%' } }
  ];

  return (
    <BaseNode
      id={props.id}
      handles={handles}
      label="Decision Node"
      content="This node makes a decision."
      {...props}
    />
  );
};

export default DecisionNode;
