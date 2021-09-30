import { BoardsNavBar } from '../cmps/BoardsNavBar';
import React, { useState, useEffect } from 'react';
import {
  loadBoards,
  setBoards,
} from '../store/actions/boards-actions.js';
import { Link } from 'react-router-dom';
import { getEmptyBoard } from '../services/board-service';
import { TextField } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
export function Workspace() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);
  const { boards } = useSelector((state) => state.boardModule);
  const [boardsState, setBoardsState] = useState(boards);
  const [boardName, setBoardName] = useState('');

  const onAddEmptyBoard = () => {
    dispatch(setBoards([...boards, getEmptyBoard(boardName)]));
    setBoardName('');
  };

  const onRemoveBoard = (ev, boardId) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    dispatch(
      setBoards(boards.filter((board) => board._id !== boardId))
    );
  };

  return (
    <div className='work-space'>
      <BoardsNavBar />
      <h2>Workspace</h2>
      <div className='general-boards'>
        <h3>Most Popular Templates</h3>
        <button
          style={{
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            display: 'inline-block',
          }}
          onClick={onAddEmptyBoard}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <TextField
          placeholder='Add New Board...'
          variant='standard'
          onChange={(ev) => setBoardName(ev.target.value)}
          value={boardName}
          InputProps={{
            disableUnderline: true,
          }}
          inputProps={{
            style: {
              fontFamily: 'SourceSans-SemiBold',
              paddingLeft: '10px',
              marginBottom: '10px',
            },
          }}
        />
        <div className='work-space-boards'>
          {boards.map((board, idx) => (
            <Link to={`/board/${board._id}`} key={idx}>
              <div className='board-preview flex justify-center' style={{backgroundColor: board.bgColor}}>
                {board.title}
                <button
                  className='remove-board'
                  onClick={(ev) => onRemoveBoard(ev, board._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
