import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function Task({ task, onRemoveTask, groupId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    console.log('hey');
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="task-preview">
      {/* <h3 className="header">{task.title}
      </h3> */}
      <TextField
        fullWidth
        variant='outlined'
        value={task.title}
      />
      <div>
        <button onClick={() => onRemoveTask(groupId, task.id)}>
          remove
        </button>
        <button onClick={openModal}>Edit</button>
      </div>
      <div>
        <Button
          fullWidth
          aria-describedby={id}
          variant='contained'
          onClick={handleClick}
        >
          edit
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography sx={{ p: 2 }} className='btn-pop'>
            <button>Open Card</button>
            <button>Edit Labes</button>
            <button>Change members</button>
            <button>Move</button>
            <button>Copy</button>
            <button>Edit Label</button>
            <button>Archive</button>
          </Typography>
        </Popover>
      </div>
    </div>
  );
}
