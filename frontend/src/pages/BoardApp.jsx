import React, { useState } from 'react';
import Group from '../cmps/Group';
import {
  getBoards,
  getEmptyGroup,
  constructTask,
} from '../services/board-service.js';
const boardsJson = getBoards();
export function BoardApp(props) {
  const board = boardsJson.find(
    (value) => value._id === props.match.params.boardId
  );
  const [boardState, setBoardState] = useState(board);
  const addEmptyGroup = () => {
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: [...boardState.groups, getEmptyGroup()],
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
    console.log(taskIdx);
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
    />
  ));
  return (
    <div>
      <h1>{board.title}</h1>
      <button onClick={addEmptyGroup}>Add Group</button>
      <div>{groups}</div>
    </div>
  );
}
