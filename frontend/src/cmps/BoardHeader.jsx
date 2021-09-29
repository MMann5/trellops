import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { setBoards } from '../store/actions/boards-actions.js';

export function BoardHeader({ board }) {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boardModule);
  const { boardId } = useParams();
  console.log(boardId);
  if (!boardId) board._id = boardId;
  const currBoard = boards.find(
    (boardVal) => boardVal._id === boardId
  );
  const [boardName, setBoardName] = useState(currBoard.title);
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
      <div
        style={{
          width: 'auto',
          textAlign: 'center',
          marginInlineStart: '10px',
        }}
      >
        <TextField
          variant='standard'
          value={boardName}
          onChange={(ev) => setBoardName(ev.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          inputProps={{
            style: {
              fontFamily: 'SourceSans-SemiBold',
              fontSize: '1.2rem',
              color: 'white',
            },
          }}
        />
      </div>
      <div className='flex header-section'>
        <div className='board-header-members flex align-center'>
          <a>
            <h4 className='wide-layout'>Invite</h4>
          </a>
        </div>
        <Link to={'/board/'} className='clean-link'>
          <h4 className='wide-layout'>Dashboard</h4>
        </Link>
        <a>
          <h4 className='wide-layout'>Show Menu</h4>
        </a>
      </div>
    </div>
  );
}
