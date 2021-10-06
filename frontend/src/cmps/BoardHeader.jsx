import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TextField, TextareaAutosize } from '@material-ui/core';
import { setBoards } from '../store/actions/boards-actions.js';
import { RightMenu } from './RightMenu';

export function BoardHeader({ boards, board, setBgColor }) {
  const [boardName, setBoardName] = useState(board.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const idx = boards.findIndex(
    (boardUnit) => board._id === boardUnit._id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const newBoard = { ...board, title: boardName };
    const boardsCopy = [...boards];
    boardsCopy.splice(idx, 1, newBoard);
    dispatch(setBoards(boardsCopy));
  }, [dispatch, boardName]);

  return (
    <div className='board-header'>
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
      <div className='flex header-section'>
        <div className='board-header-members flex align-center'>
          <a>
            <h4 className='wide-layout'>Invite</h4>
          </a>
        </div>
        <RightMenu setBgColor={setBgColor} board={board} />
      </div>
    </div>
  );
}
