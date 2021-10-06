import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { getEmptyBoard } from '../services/board-service';
import {
  loadBoards,
  setBoards,
} from '../store/actions/boards-actions.js';
import { BoardsNavBar } from '../cmps/BoardsNavBar';

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
        <h3>My Boards</h3>
        <div className='work-space-boards'>
          <button
            className='board-preview flex justify-center add-board'
            onClick={onAddEmptyBoard}
          >
            Add A New Board..
          </button>
          {boards.map((board, idx) => (
            <Link to={`/board/${board._id}`} key={idx}>
              <div
                className='board-preview flex justify-center'
                style={{
                  backgroundColor: board.style?.bgColor,
                  backgroundImage: `url(${board.style?.bgColor})`,
                }}
              >
                {board.title ? board.title : 'Click To Set board'}
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
