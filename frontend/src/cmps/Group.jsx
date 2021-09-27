import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Task } from './Task';
import addIcon from '../assets/imgs/icons/add.svg';
export default function Group({
  group,
  onRemoveGroup,
  setGroupTitle,
  onAddTask,
  onRemoveTask,
  onSetTask,
}) {
  var list = group.tasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onRemoveTask={onRemoveTask}
        groupId={group.id}
        onSetTask={onSetTask}
      />
    );
  });

  const [taskVal, setTaskVal] = useState('');
  const composeTask = (ev) => {
    setTaskVal(ev.target.value);
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
          className="group-title"
          fullWidth
          placeholder="Enter list title..."
          variant='standard'
          value={group.title}
          onChange={(ev) => setGroupTitle(ev, group.id)}
          inputProps={{
            style: { fontSize: '14px', fontFamily: 'SourceSans-SemiBold', paddingLeft: '10px' }
          }}
        />

        <div className='card-list'>
          <div className='card-list-cards'>
            {list}
            <div>
              {/* <TextField
                variant='outlined'
                placeholder='new task'
                fullWidth
                onChange={composeTask}
              /> */}
              <div className="card-btn-container">
                <img src={addIcon} alt='' />
                <button
                  className='card-btn'
                  onClick={() => onAddTask(group.id, taskVal)}
                > Add a Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
