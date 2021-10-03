import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { TaskDetails } from '../pages/TaskDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { DetailModal } from './DetailModal';

export function Task({ task, onRemoveTask, groupId, onSetTask, boardId }) {
  const [color, setColor] = useState('#fffff');
  const setColorFunc = (colorVal) => {
    return setColor(colorVal);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='task-preview' style={{ backgroundColor: color }} >
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
      <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
        <div className='task-btns' >
          <button onClick={() => onRemoveTask(groupId, task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {/* <DetailModal taskId={task.id} setColorFunc={setColorFunc} closeModal={closeModal} modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen} /> */}
        </div>
      </Link>
    </div>
  );
}
