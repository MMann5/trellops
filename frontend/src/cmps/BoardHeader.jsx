import React from 'react';
import { TextField } from '@material-ui/core';
import { RightMenu } from './RightMenu';

export function BoardHeader({ board, setBgColor, setBoardTitle }) {
  const members = board.members.map((val, idx) => {
    return (
      <div key={idx}>
        <img
          src={
            require(`../assets/imgs/profiles/${val.imgUrl}`).default
          }
          alt=''
        />
      </div>
    );
  });

  return (
    <div className='board-header flex'>
      <TextField
        variant='standard'
        value={board.title}
        onChange={(ev) => setBoardTitle(ev.target.value)}
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: {
            display: 'flex',
            padding: '5px',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            color: '#ffffff',
            outline: 'unset',
            border: 'unset',
            position: 'relative',
            height: '22px',
            marginInlineEnd: '5px',
            fontWeight: 'bold',
          },
        }}
      />
      <div className='header-section flex  align-center'>
        <div className='board-header-members flex'>
          <div className='members-icon flex'>{members}</div>
        </div>
        <RightMenu setBgColor={setBgColor} board={board} />
      </div>
    </div>
  );
}
