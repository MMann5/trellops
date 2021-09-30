import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { setBoards } from '../store/actions/boards-actions.js';
import {RightMenu} from './RightMenu';
export function BoardHeader({ board, setBgColor}) {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boardModule);
  const { boardId } = useParams();
  console.log(boardId);
  if (!boardId) board._id = boardId;
  const currBoard = boards.find(
    (boardVal) => boardVal._id === boardId
  );
  const [boardName, setBoardName] = useState(currBoard.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const idx = boards.findIndex(
    (boardUnit) => boardId === boardUnit._id
  );
  useEffect(() => {
    const newBoard = { ...currBoard, title: boardName };
    console.log(newBoard);
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
            fontSize: '1.2rem',
            color: 'white',
          },
        }}
      />
      <div className='flex header-section'>
        <div className='board-header-members flex align-center'>
          <a>
            <h4 className='wide-layout'>Invite</h4>
          </a>
        </div>
        <Link to={'/board/'} className='clean-link'>
          <h4 className='wide-layout'>Dashboard</h4>
        </Link>
      <RightMenu setBgColor={setBgColor}/>
      </div>
    </div>
  );
}
