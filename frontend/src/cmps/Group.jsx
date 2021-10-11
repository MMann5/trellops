import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Popover from '@mui/material/Popover';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { Task } from './Task';

export default function Group({
  group,
  onRemoveGroup,
  setGroupTitle,
  onAddTask,
  onRemoveTask,
  onSetTask,
}) {
  const { board } = useSelector((state) => state.boardModule);
  const currGroup = board.groups.find((g) => g.id === group.id);
  const [tasks, setTasks] = useState(group.tasks);
  useEffect(() => {
    setTasks(currGroup ? currGroup.tasks : group.tasks);
  }, [board]);

  const dragStyle = (style, snapshot) =>
    !snapshot.isDropAnimating
      ? style
      : { ...style, transitionDuration: '0.001s' };

  var list =
    tasks &&
    tasks.map((task, idx) => {
      if (!task) return;
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='group-container'>
      <Droppable droppableId={group.id}>
        {(provided) => (
          <div className='container'>
            <div className='remove-div'>
              <TextField
                autoFocus
                placeholder='Enter a title...'
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
                    paddingLeft: '17px',
                  },
                }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                height='1000px'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <h5
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onRemoveGroup(group.id);
                  }}
                >
                  Delete List
                </h5>
              </Popover>
              <button
                className='remove-group'
                aria-describedby={id}
                onClick={handleClick}
              >
                <MoreHorizIcon />
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
                  <div className='card-btn-container flex align-center'>
                    <AddIcon fontSize='small' />
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
