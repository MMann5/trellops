import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export function FileAttachment({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const [stateVal, createStateVal] = useState('');
  const checkUrl = (url) =>
    url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  const pressKey = (ev) => {
    if (ev.keyCode === 13) {
      checkUrl(stateVal) &&
        sendTask(false, {
          ...props,
          attachments: props.attachments
            ? [...props.attachments, stateVal]
            : [stateVal],
        });
      createStateVal('');
    }
  };

  return (
    <div
      className='checklist'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}
    >
      <div className='nav-option-header flex align-center'>
        <button className='clean-btn hide'>
          <CloseRoundedIcon />
        </button>
        <h3>Attach an Image link</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <TextField
        size='small'
        margin='normal'
        variant='outlined'
        onChange={(ev) => createStateVal(ev.target.value)}
        value={stateVal}
        inputRef={(input) => input && input.focus()}
        onKeyDown={pressKey}
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
          className='blue-btn attach-btn'
        >
          Add file
        </button>
      </div>
    </div>
  );
}
