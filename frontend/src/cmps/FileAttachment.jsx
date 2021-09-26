import React from 'react';
import { TextField } from '@material-ui/core';
import ReactPlayer from 'react-player';
export function FileAttachment() {
  const [stateVal, createStateVal] = React.useState('');
  const [fileStateVal, createFileVal] = React.useState([]);

  const removeFile = (idx) => {
    const fileCopy = [...fileStateVal];
    fileCopy.splice(idx, 1);
    createFileVal(fileCopy);
  };

  const file = fileStateVal.map((val, idx) => {
    return (
      <li key={idx}>
        <ReactPlayer width='150px' height='150' url={val} />
        <button onClick={() => removeFile(idx)}>x</button>
      </li>
    );
  });

  return (
    <div className='checkfile'>
      <TextField
        // fullWidth
        size='small'
        margin='normal'
        variant='outlined'
        onChange={(ev) => createStateVal(ev.target.value)}
        value={stateVal ? stateVal : ''}
      />
      <div>
        <button
          onClick={() => {
            createFileVal([...fileStateVal, stateVal]);
            createStateVal('');
          }}
        >
          add file
        </button>
      </div>
      <div className='checkfile-display'>
        <ul>{file}</ul>
      </div>
    </div>
  );
}
