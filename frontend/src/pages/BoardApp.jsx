import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Group from '../cmps/Group';
import { BoardsNavBar } from '../cmps/BoardsNavBar.jsx';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import {
  loadBoard,
  onSaveBoard,
  setBoards,
} from '../store/actions/boards-actions.js';
import {
  getEmptyGroup,
  constructTask,
  boardService,
} from '../services/board-service.js';
import { TaskDetails } from './TaskDetails';

export function BoardApp(props) {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boardModule);
  const [boardState, setBoardState] = useState(board);
  const [modalState, setModalState] = useState(false)
  useEffect(()=>{
    if (props.match.params.taskId){
      setModalState(true)
    } else{
      setModalState(false)
    }
  })

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
    const currUser = 'Avi Abambi';
    const newActivity = boardService.createActivity(currUser, 'added a new group')
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: [...boardState.groups, getEmptyGroup(groupName)],
        activities:[...boardState.activities, newActivity ]
      };
    });
  };

  const onRemoveGroup = (groupId) => {
    const currGroup= boardService.findGroupById(board, groupId)
    const newActivity = boardService.createActivity('Avi Abambi', 'removed group')
    setBoardState((prevState) => {
      return {
        ...prevState,
        groups: boardState.groups.filter(
          (value) => value.id !== groupId
        ), activities: [...boardState.activities, newActivity]
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

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (result.type === 'group') {
      const items = Array.from(boardState.groups);
      const [reorderedGroup] = items.splice(result.source.index, 1);
      if (!result.destination) return;
      items.splice(result.destination.index, 0, reorderedGroup);
      setBoardState({ ...boardState, groups: items });
    } else {
      const groupsCpy = Array.from(boardState.groups);
      const destGrp = groupsCpy.find(
        (group) => group.id === destination.droppableId
      );
      const srcGrp = groupsCpy.find(
        (group) => group.id === source.droppableId
      );
      const card = srcGrp.tasks.splice(source.index, 1);
      destGrp.tasks.splice(destination.index, 0, card[0]);
      console.log(groupsCpy);
      setBoardState({ ...boardState, groups: groupsCpy });
    }
  };

  var groups = boardState.groups.map((group, idx) => {
    return (
      <Draggable key={group.id} draggableId={group.id} index={idx}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Group
              boardId={board._id}
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
  });

  const setBgColor = (colorVal) => {
    const boardCpy = { ...board };
    boardCpy.style.bgColor = colorVal;
    const boardsCpy = [...boards];
    const boardIdx = boardsCpy.findIndex(
      (val) => val._id === board._id
    );
    boardsCpy.splice(boardIdx, 1, boardCpy);
    dispatch(setBoards(boardsCpy));
    setBoardState(boardCpy);
  };

  return (
    <div
      className='board-app flex column'
      style={{ backgroundColor: boardState.style?.bgColor, backgroundImage : `url(${boardState.style?.bgColor})` }}
    >
      <BoardsNavBar />
      <BoardHeader board={board} setBgColor={setBgColor} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
      {modalState && <TaskDetails props={props} board={board}/>}
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
  );
}
