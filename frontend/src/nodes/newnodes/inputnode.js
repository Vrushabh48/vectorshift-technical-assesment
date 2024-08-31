import React from 'react';
import BaseNode from './BaseNode';

const InputNode = (props) => {
  const handles = [
    { id: 'output-1', type: 'source', position: 'right', style: { top: '50%' } }
  ];

  return (
    <BaseNode
      id={props.id}
      handles={handles}
      label="Input Node"
      content="This is an input node."
      {...props}
    />
  );
};

export default InputNode;
