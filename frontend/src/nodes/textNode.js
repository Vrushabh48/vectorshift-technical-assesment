import React, { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  const calculateDimensions = (text) => {
    if (!textareaRef.current) return { width: 200, height: 80 };
    const charWidth = getCharWidth();
    const maxLineLength = Math.max(...text.split('\n').map(line => line.length));
    return { width: Math.max(200, maxLineLength * charWidth + 20), height: 'auto' };
  };

  const getCharWidth = () => {
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.textContent = 'M';
    document.body.appendChild(tempSpan);
    const charWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    return charWidth;
  };

  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9])\s\}\}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1]);
    }
    return variables;
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    setDimensions(calculateDimensions(newText));
    setHandles(createHandlesForVariables(newText));
  };

  const createHandlesForVariables = (text) => {
    const variables = extractVariables(text);
    return variables.map(variable => ({
      type: 'target',
      position: 'Left',
      id: variable,
    }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to 'auto' to calculate the new scroll height
      textareaRef.current.style.height = 'auto';
      // Set the height based on the scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    // Assuming createHandlesForVariables is a function to create handles based on currText
    setHandles(createHandlesForVariables(currText));
  }, [currText]);


  useEffect(() => {
    setDimensions(calculateDimensions(currText));
  }, [dimensions.width]);

  return (
    <BaseNode
  id={id}
  handles={[
    ...handles,
    { type: 'source', position: 'Right', id: 'output' },
  ]}
  label="Text Node"
  content={
    <textarea 
      ref={textareaRef}
      value={currText} 
      onChange={(e) => {
        handleTextChange(e);
        // Dynamically adjust the height based on the content
        textareaRef.current.style.height = 'auto'; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
      }}
      style={{ 
        width: dimensions.width - 20, 
        height: textareaRef.current?.scrollHeight || 80, 
        overflow: 'hidden' 
      }}
    />
  }
  style={{ 
    width: dimensions.width, 
    height: Math.max(textareaRef.current?.scrollHeight + 40 || 120, dimensions.height), 
    border: '1px solid black' 
  }}
/>

  );
};