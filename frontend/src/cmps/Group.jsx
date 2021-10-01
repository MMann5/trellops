import React, { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import addIcon from '../assets/imgs/icons/add.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Task } from './Task';

export default function Group({
  group,
  onRemoveGroup,
  setGroupTitle,
  onAddTask,
  onRemoveTask,
  onSetTask,
  boardId
}) {
  const { board } = useSelector((state) => state.boardModule);
  const currGroup = board.groups.find((g) => g.id === group.id);
  console.log(currGroup);
  const [tasks, setTasks] = useState(group.tasks);
  useEffect(() => {
    setTasks(currGroup ? currGroup.tasks : group.tasks);
  }, [board]);

  const dragStyle = (style, snapshot) =>
    !snapshot.isDropAnimating
      ? style
      : { ...style, transitionDuration: '0.001s' };

  var list = tasks.map((task, idx) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={idx}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={dragStyle(
              provided.draggableProps.style,
              snapshot
            )}
          >
            <Task
              key={task.id}
              task={task}
              onRemoveTask={onRemoveTask}
              groupId={group.id}
              onSetTask={onSetTask}
              boardId={board._id}
            />
          </div>
        )}
      </Draggable>
    );
  });

  const [taskVal, setTaskVal] = useState('');
  const composeTask = (ev) => {
    setTaskVal(ev.target.value);
  };
  const handleOnDragEnd = (result) => {
    const items = Array.from(tasks);
    const [reorderedTask] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedTask);
    setTasks(items);
  };

  return (
    <div className='group-container'>
      <Droppable droppableId={group.id}>
        {(provided) => (
          <div className='container'>
            <div className='remove-div'>
              <TextField
                autoFocus
                // className='group-title'
                placeholder='Enter list title...'
                variant='standard'
                value={group.title}
                onChange={(ev) => setGroupTitle(ev, group.id)}
                InputProps={{
                  disableUnderline: true, // <== added this
                }}
                inputProps={{
                  style: {
                    fontSize: '16px',
                    fontFamily: 'SourceSans-SemiBold',
                    paddingLeft: '10px',
                  },
                }}
              />
              <button
                className='remove-group'
                onClick={() => {
                  onRemoveGroup(group.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <div className='card-list'>
              <div className='card-list-cards'>
                <div
                  className='tasks'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list}
                  {provided.placeholder}
                </div>
                <div>
                  <div className='card-btn-container'>
                    <img src={addIcon} alt='' />
                    <button
                      className='card-btn'
                      onClick={() => onAddTask(group.id, taskVal)}
                    >
                      {' '}
                      Add a Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
