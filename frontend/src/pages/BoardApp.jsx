import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadBoards,
  loadBoard,
  onSaveBoard,
} from '../store/actions/boards-actions.js';
import Group from '../cmps/Group';
import {
  getEmptyGroup,
  constructTask,
} from '../services/board-service.js';
// import { boardService } from '../services/board-service.js';
import { BoardsNavBar } from '../cmps/BoardsNavBar.jsx';
import addIcon from '../assets/imgs/icons/add.svg';

export function BoardApp(props) {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boardModule);
  const [boardState, setBoardState] = useState(board);
  useEffect(() => {
    dispatch(loadBoard(props.match.params.boardId));
  }, [dispatch]);
  useEffect(() => {
    setBoardState(board);
  }, [board]);

  useEffect(() => {
    dispatch(onSaveBoard(boardState));
  }, [boardState, dispatch]);

  const { boards } = useSelector((state) => state.boardModule);
  const [groupName, setGroupName] = useState('');
  const onAddEmptyGroup = () => {
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: [...boardState.groups, getEmptyGroup(groupName)],
      };
    });
  };
  const onRemoveGroup = (groupId) => {
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardState.groups.filter(
          (value) => value.id !== groupId
        ),
      };
    });
  };
  const onAddTask = (groupId, txt) => {
    const group = boardState.groups.find(
      (value) => value.id === groupId
    );
    const groupCopy = { ...group };
    groupCopy.tasks.push(constructTask(txt));
    const idx = boardState.groups
      .map((group) => {
        return group.id;
      })
      .indexOf(groupId);
    let boardGroupsCopy = [...boardState.groups];
    boardGroupsCopy.splice(idx, 1, groupCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
      };
    });
  };
  const onSetTask = (ev, groupId, taskId) => {
    const group = boardState.groups.find(
      (value) => value.id === groupId
    );
    const groupCopy = { ...group };
    const taskIdx = groupCopy.tasks.findIndex(
      (task) => task.id === taskId
    );
    groupCopy.tasks[taskIdx].title = ev.target.value;
    const idx = boardState.groups
      .map((group) => {
        return group.id;
      })
      .indexOf(groupId);
    let boardGroupsCopy = [...boardState.groups];
    boardGroupsCopy.splice(idx, 1, groupCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
      };
    });
  };

  const onRemoveTask = (groupId, taskId) => {
    const group = boardState.groups.find(
      (value) => value.id === groupId
    );
    const groupIdx = boardState.groups
      .map((group) => {
        return group.id;
      })
      .indexOf(groupId);

    const groupCopy = { ...group };
    const taskIdx = groupCopy.tasks
      .map((task) => task.id)
      .indexOf(taskId);
    groupCopy.tasks.splice(taskIdx, 1);
    let boardGroupsCopy = [...boardState.groups];
    boardGroupsCopy.splice(groupIdx, 1, groupCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
      };
    });
  };

  const setGroupTitle = (ev, groupId) => {
    const group = boardState.groups.find(
      (value) => value.id === groupId
    );

    const idx = boardState.groups
      .map((group) => {
        return group.id;
      })
      .indexOf(groupId);

    let groupCopy = { ...group };
    groupCopy.title = ev.target.value;
    let boardGroupsCopy = [...boardState.groups];
    boardGroupsCopy.splice(idx, 1, groupCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
      };
    });
  };

  const groups = boardState.groups.map((group) => (
    <Group
      onRemoveGroup={onRemoveGroup}
      group={group}
      setGroupTitle={setGroupTitle}
      key={group.id}
      onAddTask={onAddTask}
      onRemoveTask={onRemoveTask}
      onSetTask={onSetTask}
    />
  ));
  return (
    <div className='board-app flex column'>
      <BoardsNavBar />
      <h1>{board.title}</h1>
      <div className='group-list'>
        {groups}
        {/* <TextField
          variant='standard'
          placeholder='Add Group'
          onChange={composeGroup}
          inputProps={{
            style: { color:'red', fontSize:'14px' }
          }}
        /> */}
        <button className='add-group-btn' onClick={onAddEmptyGroup}>
          <img src={addIcon} alt='' />
          Add another list
        </button>
      </div>
    </div>
  );
}
