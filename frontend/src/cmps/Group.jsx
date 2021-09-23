import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Task } from './Task';

export default function Group({
  group,
  onRemoveGroup,
  setGroupTitle,
  onAddTask,
  onRemoveTask,
}) {
  var list = group.tasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onRemoveTask={onRemoveTask}
        groupId={group.id}
      />
    );
  });
  const [taskVal, setTaskVal] = useState('');
  const composeTask = (ev) => {
    setTaskVal(ev.target.value);
  };

  return (
    <div
      className='group-preview'
      style={{
        display: 'inline-block',
        margin: '20px',
        padding: '5px',
        width: '230px',
      }}
    >
      <div
        className='task-preview'
        style={{ border: 'solid black 1px' }}
      >
        <TextField
          variant='outlined'
          value={group.title}
          onChange={(ev) => setGroupTitle(ev, group.id)}
        />
        {list}
        <div>
          <TextField
            variant='outlined'
            placeholder='new task'
            onChange={composeTask}
          />
          <div>
            <button onClick={() => onAddTask(group.id, taskVal)}>
              Add Task
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            onRemoveGroup(group.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
