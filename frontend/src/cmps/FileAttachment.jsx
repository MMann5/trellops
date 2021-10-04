import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function FileAttachment({ props, setCurrPopover, sendTask }) {
  const [stateVal, createStateVal] = useState('');
  const checkUrl = (url) =>
    url.match(/\.(jpeg|jpg|gif|png)$/) != null;

  return (
    <div className='checklist'>
      <div className='nav-option-header flex justify-center'>
        <h3>Attach a Image link</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className='close-x' />
        </button>
      </div>
      <TextField
        size='small'
        margin='normal'
        variant='outlined'
        onChange={(ev) => createStateVal(ev.target.value)}
        value={stateVal}
      />
      <div>
        <button
          onClick={() => {
            checkUrl(stateVal) &&
              sendTask(false, {
                ...props,
                attachments: props.attachments
                  ? [...props.attachments, stateVal]
                  : [stateVal],
              });
            createStateVal('');
          }}
          className='attach-btn blue-btn'
        >
          Add file
        </button>
      </div>
    </div>
  );
}
