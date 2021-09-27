import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Task } from './Task';
import addIcon from '../assets/imgs/icons/add.svg';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
export default function Group({
  group,
  onRemoveGroup,
  setGroupTitle,
  onAddTask,
  onRemoveTask,
  onSetTask,
}) {
  const [tasks, setTasks] = useState(group.tasks);

  var list = tasks.map((task, idx) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={idx}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Task
              key={task.id}
              task={task}
              onRemoveTask={onRemoveTask}
              groupId={group.id}
              onSetTask={onSetTask}
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
      <button
        onClick={() => {
          onRemoveGroup(group.id);
        }}
      >
        Delete
      </button>
      <div className='container'>
        <TextField
          className='group-title'
          fullWidth
          placeholder='Enter list title...'
          variant='standard'
          value={group.title}
          onChange={(ev) => setGroupTitle(ev, group.id)}
          inputProps={{
            style: {
              fontSize: '14px',
              fontFamily: 'SourceSans-SemiBold',
              paddingLeft: '10px',
            },
          }}
        />

        <div className='card-list'>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='card-list-cards'>
              <Droppable droppableId='tasks'>
                {(provided) => (
                  <div
                    className='tasks'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {list}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
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
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
