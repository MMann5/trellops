import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { DetailModal } from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowRight} from '@fortawesome/free-solid-svg-icons';

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
        variant='standard'
        value={task.title}
        placeholder='Enter a title for this card...'
        onChange={(ev) => onSetTask(ev, groupId, task.id)}
        inputProps={{
          style: { fontSize: '14px' }
        }}
        InputProps={{
          disableUnderline: true, // <== added this
        }}
      />
      <div className="task-btns">
        <button onClick={() => onRemoveTask(groupId, task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <DetailModal taskId={task.id} setColorFunc={setColorFunc} />
      </div>
    </div>
  );
}
