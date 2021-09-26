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
      <Task key={task.id} task={task} onRemoveTask={onRemoveTask} groupId={group.id} />
    );
  });

  const [taskVal, setTaskVal] = useState('');
  const composeTask = (ev) => { setTaskVal(ev.target.value); };

  return (
    <div className='group-container'>
      <div className='container'>
        <TextField fullWidth variant='outlined' value={group.title}
          onChange={(ev) => setGroupTitle(ev, group.id)} />
        <div className="card-list">
          <div className="card-list-cards"> {list}
            <div><TextField variant='outlined' placeholder='new task' fullWidth onChange={composeTask} />
              <div>
                <button className='card-btn' onClick={() => onAddTask(group.id, taskVal)}>Add Task</button>
              </div>
            </div>
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

      {/* <div><TextField variant='outlined' placeholder='new task' fullWidth onChange={composeTask} /><div>
        <button className='card-btn' onClick={() => onAddTask(group.id, taskVal)}>Add Task</button>
      </div>
      </div> */}

    </div>
  );
}
