import { BoardsNavBar } from '../cmps/BoardsNavBar';
import React, { useState, useEffect } from 'react';
import { loadBoards } from '../store/actions/boards-actions.js';
import { Link } from 'react-router-dom';
import { getEmptyBoard } from '../services/board-service';

import { useDispatch, useSelector } from 'react-redux';
export function Workspace() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadBoards());
  // }, [dispatch]);
  const { boards } = useSelector((state) => state.boardModule);
  const [boardsState, setBoardsState] = useState(boards);


  // const onAddEmptyBoard = () => {
  //   setBoardsState((prevState) => {
  //     return {
  //       ...prevState,
  //       boards: {...boardsState.boards, getEmptyBoard('groupName')},
  //     };
  //   });
  // };

  return (
    <div className='work-space'>
      <BoardsNavBar />
      <h2>Workspace</h2>
      <div className='general-boards'>
        <h3>Most popular templates</h3>
        <div className='work-space-boards'>
          <button className='board-preview flex justify-center new-board' /*onClick={onAddEmptyBoard}*/>ADD BOARD</button>
          {boards.map((board, idx) => (
            <Link to={`/board/${board._id}`}>
              <div
                className='board-preview flex justify-center'
                key={idx}
              >
                {board.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
