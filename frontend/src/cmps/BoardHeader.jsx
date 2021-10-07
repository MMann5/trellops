import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TextField, TextareaAutosize } from '@material-ui/core';
import {
  setBoards,
  onSaveBoard,
} from '../store/actions/boards-actions.js';
import { RightMenu } from './RightMenu';

export function BoardHeader({ boards, board, setBgColor }) {
  const [boardName, setBoardName] = useState(board.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const newBoard = { ...board, title: boardName };
    dispatch(onSaveBoard(newBoard));
  }, [boardName]);

  const members = board.members.map((val, idx) => {
    return (
      <div key={idx}>
        <img src={require(`../assets/imgs/profiles/${val.imgUrl}`).default} alt="" />
      </div>
    );
  });

  return (
    <div className='board-header flex'>
      <TextField
        variant='standard'
        value={boardName}
        onChange={(ev) => setBoardName(ev.target.value)}
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
          <div className='members-icon flex'>
            {members}
          </div>
          <a>
            <h4 className='wide-layout'>Invite</h4>
          </a>
        </div>
        <RightMenu setBgColor={setBgColor} board={board} />
      </div>
    </div>
  );
}
