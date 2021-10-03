import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import { TaskDetails } from '../pages/TaskDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SubjectIcon from '@material-ui/icons/Subject';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export function Task({ task, onRemoveTask, groupId, onSetTask, boardId }) {
  const [color, setColor] = useState('#fffff');
  const setColorFunc = (colorVal) => {
    return setColor(colorVal);
  };

  // const [toggleLabel, SetToggleLabel] = useState(false)

  return (
    <div className='task-preview' style={{ backgroundColor: color }} >
      <div className="label-view">{task.labels?.map((label, idx) => {
        return (
          <span className='labels-task' style={{ backgroundColor: label.color }} key={idx}>{label.title}</span>
        )
      })}</div>
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
          <div className="sign-task">
            <span>{task.description ? <SubjectIcon /> : ''}</span>
            <span>{task.checklists ? <CheckBoxOutlinedIcon /> : ''}</span>
          </div>
          <div className="avatar">{task.members?.map((member, idx) => {
            return (<span key={idx} className="avatar-img"><Stack direction="row" spacing={2}>
              <Avatar sx={{ width: 20, height: 20, bgcolor: deepPurple[500] }}>{member.username.charAt(0)}</Avatar>
            </Stack></span>)
          })}</div>
        </div>
      </Link>
    </div>
  );
}
{/* /* <button onClick={() => onRemoveTask(groupId, task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button> */}