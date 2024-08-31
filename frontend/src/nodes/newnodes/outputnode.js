import React from 'react';
import BaseNode from './BaseNode';

const OutputNode = (props) => {
  const handles = [
    { id: 'input-1', type: 'target', position: 'left', style: { top: '50%' } }
  ];

  return (
    <BaseNode
      id={props.id}
      handles={handles}
      label="Output Node"
      content="This is an output node."
      {...props}
    />
  );
};

export default OutputNode;
