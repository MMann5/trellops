import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { DetailModal } from './Modal';

export function Task({ task, onRemoveTask, groupId, onSetTask }) {
  const [color, setColor] = useState('#fffff');
  const setColorFunc = (colorVal) => {
    return setColor(colorVal);
  };

  return (
    <div className='task-preview' style={{ backgroundColor: color }}>
      <TextField
        fullWidth
        size='small'
        variant='standard'
        value={task.title}
        placeholder='Enter a title for this card...'
        onChange={(ev) => onSetTask(ev, groupId, task.id)}
        InputProps={{
          disableUnderline: true, // <== added this
        }}
      />
      <div className='task-btns'>
        <button onClick={() => onRemoveTask(groupId, task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <DetailModal taskId={task.id} setColorFunc={setColorFunc} />
      </div>
    </div>
  );
}
