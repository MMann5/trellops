import React, { useState } from 'react';
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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <h3>{task.title}</h3>
      <button onClick={() => onRemoveTask(groupId, task.id)}>
        remove
      </button>
      <div>
        <Button
          aria-describedby={id}
          variant='contained'
          onClick={handleClick}
        >
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button>Open Card</button>
              <button>Edit Labes</button>
              <button>Change members</button>
              <button>Move</button>
              <button>Copy</button>
              <button>Edit Label</button>
              <button>Archive</button>
            </div>
          </Typography>
        </Popover>
      </div>
    </div>
  );
}
