import React from 'react';
import ReactPlayer from 'react-player';

import { TextField } from '@material-ui/core';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export function FileAttachment({ closePopup,attachment }) {
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



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
        <div className='checkfile'>
      <div className="nav-option-header flex justify-center">
        <h3>Attach a file</h3>
        <button className="clean-btn" onClick={() => { closePopup('isFileOpen') }}>
          <FontAwesomeIcon icon={faTimes} className="close-x" />
        </button>
      </div>
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
          className="attach-btn blue-btn"
        >
          Add file
        </button>
      </div>
      <div className='checkfile-display'>
        <ul>{file}</ul>
      </div>
    </div>
  );
}
