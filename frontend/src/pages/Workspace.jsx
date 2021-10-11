import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  loadBoards,
  onAddBoard,
} from '../store/actions/boards-actions.js';
import { BoardsNavBar } from '../cmps/BoardsNavBar';
import { WorkspacePopup } from '../cmps/WorkspacePopup';


export function Workspace() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBoards());
  }, []);

  const { boards } = useSelector((state) => state.boardModule);
  const [boardsState, setBoardsState] = useState(boards);
  const [boardName, setBoardName] = useState('');
  const [isPopShown, setIsPopShown] = useState(false);
  const [boardBackground, setBoardBackground] = useState('#0079bf');

  const onAddEmptyBoard = (boardName, boardBackground) => {
    dispatch(
      onAddBoard({ txt: boardName, bgColor: boardBackground })
    );
  };

  const onShowPopup = () => {
    setIsPopShown(true);
  };
  const onClosePopup = () => {
    setIsPopShown(false);
  };

  return (
    <div
      className={isPopShown ? 'work-space opacity' : 'work-space'}
    >
      <BoardsNavBar />
      <div className='general-boards'>
        <h2>Workspace</h2>
        <div className='work-space-boards'>
          {boards.map((board, idx) => (
            <Link to={`/board/${board._id}`} key={idx}>
              <div
                className='board-preview'
                style={{
                  backgroundColor: board.style?.bgColor,
                  backgroundImage: `url(${board.style?.bgColor})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div>{board.title}</div>
              </div>
            </Link>
          ))}
          <div
            className='board-preview new flex justify-center'
            onClick={() => onShowPopup()}
          >
            Create new board
          </div>
        </div>
      </div>
      {isPopShown && (
        <WorkspacePopup
          onAddEmptyBoard={onAddEmptyBoard}
          setBoardName={setBoardName}
          boardName={boardName}
          onClosePopup={onClosePopup}
          setBoardBackground={setBoardBackground}
          boardBackground={boardBackground}
        />
      )}
    </div>
  );
}
