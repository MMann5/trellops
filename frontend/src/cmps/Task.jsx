import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
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
        margin='normal'
        variant='outlined'
        value={task.title}
        onChange={(ev) => onSetTask(ev, groupId, task.id)}
      />
      <div>
        <button onClick={() => onRemoveTask(groupId, task.id)}>
          remove
        </button>
        <DetailModal taskId={task.id} setColorFunc={setColorFunc} />
      </div>
    </div>
  );
}
