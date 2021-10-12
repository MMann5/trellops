import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  loadBoard,
  loadBoards,
  onSaveBoard,
} from '../store/actions/boards-actions.js';

import {
  getEmptyGroup,
  constructTask,
  boardService,
} from '../services/board-service.js';

import Group from '../cmps/Group';
import { BoardsNavBar } from '../cmps/BoardsNavBar.jsx';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import { TaskDetails } from './TaskDetails';
import socket from '../services/socket-service';
export function BoardApp(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { board } = useSelector((state) => state.boardModule);
  const [boardState, setBoardState] = useState(board);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBoard(props.match.params.boardId, setIsLoaded));
    dispatch(loadBoards());
    socket.on('move-applicant', (payload) => {
      setBoardState((prevState) => {
        return {
          ...prevState,
          groups: payload,
        };
      });
    });
    socket.on('set-bg', (payload) => {
      setBoardState((prevState) => {
        return {
          ...prevState,
          style: { bgColor: payload },
        };
      });
    });
    return () => socket.close();
  }, []);
  const [value] = useDebounce(boardState, 1500);
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    if (props.match.params.taskId) {
      setModalState(true);
    } else {
      setModalState(false);
    }
  });
  useEffect(() => {
    if (JSON.stringify(boardState) === JSON.stringify(board)) return;
    const boardCpy = { ...board };
    if (board && board._id) {
      const filterdTasks = board.groups.tasks?.filter?.(
        (task) => task !== null
      );
      boardCpy.groups.tasks = filterdTasks;
      setBoardState(filterdTasks ? boardCpy : board);
    } else {
      setBoardState(board);
    }
  }, [board]);

  useEffect(() => {
    if (boardState._id === props.match.params.boardId) {
      const boardStateCpy = { ...boardState };
      const filterdTasks = boardState.groups.tasks?.filter?.(
        (task) => task !== null
      );
      boardStateCpy.groups.tasks = filterdTasks;
      dispatch(
        onSaveBoard(filterdTasks ? boardStateCpy : boardState)
      );
    }
  }, [value]);

  const { boards } = useSelector((state) => state.boardModule);
  const [groupName, setGroupName] = useState('');

  const onAddEmptyGroup = () => {
    const newActivity = boardService.createActivity('new group');
    const newGroupArrCopy = [
      ...boardState.groups,
      getEmptyGroup(groupName),
    ];
    socket.emit('move-applicant', newGroupArrCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: newGroupArrCopy,
        activities:
          boardState.activities.length === 0
            ? [newActivity]
            : [...boardState.activities, newActivity],
      };
    });
  };

  const setBoardTitle = (txtInputVal) => {
    setBoardState({ ...boardState, title: txtInputVal });
  };

  const onRemoveGroup = (groupId) => {
    const currGroup = boardService.findGroupById(board, groupId);
    const newActivity = boardService.createActivity(
      'removed group',
      currGroup,
      null
    );
    const newGroups = boardState.groups.filter(
      (value) => value.id !== groupId
    );
    socket.emit('move-applicant', newGroups);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: newGroups,
        activities:
          boardState.activities.length === 0
            ? [newActivity]
            : [...boardState.activities, newActivity],
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
    const newActivity = boardService.createActivity(
      'new task',
      group,
      txt
    );
    let boardGroupsCopy = [...boardState.groups];
    boardGroupsCopy.splice(idx, 1, groupCopy);
    socket.emit('move-applicant', boardGroupsCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
        activities:
          boardState.activities.length === 0
            ? [newActivity]
            : [...boardState.activities, newActivity],
      };
    });
  };

  const onSetTask = (ev, groupId, taskId) => {
    ev.stopPropagation();
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
    socket.emit('move-applicant', boardGroupsCopy);
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
    socket.emit('move-applicant', boardGroupsCopy);
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
    socket.emit('move-applicant', boardGroupsCopy);
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardGroupsCopy,
      };
    });
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;
    const groupsCpy = [...boardState.groups];
    if (!destination) return;
    if (result.type === 'group') {
      const [reorderedGroup] = groupsCpy.splice(
        result.source.index,
        1
      );
      groupsCpy.splice(result.destination.index, 0, reorderedGroup);
      setBoardState({ ...boardState, groups: groupsCpy });
    } else {
      const destGrp = groupsCpy.find(
        (group) => group.id === destination.droppableId
      );
      const srcGrp = groupsCpy.find(
        (group) => group.id === source.droppableId
      );
      const [card] = srcGrp.tasks.splice(source.index, 1);
      destGrp.tasks.splice(destination.index, 0, card);
      setBoardState({ ...boardState, groups: groupsCpy });
    }
    socket.emit('move-applicant', groupsCpy);
  };

  var groups = boardState.groups
    ? boardState.groups.map((group, idx) => {
        return (
          <Draggable
            key={group.id}
            draggableId={group.id}
            index={idx}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Group
                  boardId={boardState._id}
                  onRemoveGroup={onRemoveGroup}
                  group={group}
                  setGroupTitle={setGroupTitle}
                  key={group.id}
                  onAddTask={onAddTask}
                  onRemoveTask={onRemoveTask}
                  onSetTask={onSetTask}
                />
              </div>
            )}
          </Draggable>
        );
      })
    : '';

  const setBgColor = (colorVal) => {
    socket.emit('set-bg', colorVal);
    dispatch(
      onSaveBoard({ ...board, style: { bgColor: colorVal } })
    );
  };
  return boardState._id ? (
    <div
      className='board-app flex column'
      style={{
        backgroundColor: boardState.style?.bgColor,
        backgroundImage: `url(${boardState.style?.bgColor})`,
      }}
    >
      <BoardsNavBar />
      <BoardHeader
        setBgColor={setBgColor}
        board={boardState}
        setBoardTitle={setBoardTitle}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {modalState && (
          <TaskDetails props={props} board={boardState} />
        )}
        <div className='group-list'>
          <Droppable
            droppableId='groups'
            direction='horizontal'
            type='group'
          >
            {(provided) => (
              <div
                className='groups'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {groups}
                {provided.placeholder}
                <div
                  className='add-group-btn'
                  onClick={onAddEmptyGroup}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add list</span>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  ) : (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <Loader type='Bars' color='#0079bf' height={500} width={500} />
    </div>
  );
}
