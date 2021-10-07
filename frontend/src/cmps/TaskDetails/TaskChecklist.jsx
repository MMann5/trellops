import React, { useState, useEffect } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { TextareaAutosize, TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Checkbox from 'rc-checkbox';
import { Progress } from 'antd';
import { ProgressBar } from './ProgressBar';

export function TaskCheckList({ task, sendTask, togglePopover}) {
  const [listStateVal, createListVal] = React.useState(
    task.checklists ? task.checklists : ''
  );
  useEffect(() => {
    sendTask(false, { ...task, checklists: listStateVal });
  }, [listStateVal]);
  const onChange = (e, idx) => {
    const copyList = [...task.checklists];
    copyList[idx].checked = e.target.checked;
    createListVal(copyList);
  };
  const removeCheck = (idx) => {
    const listCopy = [...task.checklists];
    listCopy.splice(idx, 1);
    createListVal(listCopy);
  };
  const list = task.checklists
    ? task.checklists.map((val, idx) => {
      return (
        <li key={idx} className="checklist-item flex align-center justify-space-between">
          <div>
            <Checkbox
              onChange={(ev) => onChange(ev, idx)}
              checked={val.checked}
              style={{
                marginInline: '2px',
              }}
            />
            <span
              style={{
                marginInlineStart: '17px',
                marginInlineEnd: '17px',
              }}
            >
              {val.title}
            </span>
          </div>
          <button
            style={{
              marginInlineStart: '10px',
            }}
            onClick={() => removeCheck(idx)}
            // onClick={togglePopover("CHECKLISTSBTN")}
            className='checklist-dots-btn clean-btn'
          >
            <CloseRoundedIcon style={{ fontSize: '18px', color: '#42526e' }} />
          </button>
        </li>
      );
    })
    : '';
  return (
    <div className="checklist-container">
      <ProgressBar task={task}/>
      <ul className="clean-list">{list}</ul>
    </div>
    );
}

// <div className='checklist-preview'>
//   <div className='window-modal-title flex align-center justify-space-between'>
//     <div className='flex align-center'>
//       <CheckBoxOutlinedIcon />
//       <h3>checklist title</h3>
//      <ul>
//          <li>{list ? list : ''}</li>
//      </ul>
//     </div>
//     <button className='secondary-btn'>Delete</button>
//   </div>
//<span></span>
//   {task?.checklists?.map((todo, idx) => (
//     <div key={idx} className='title-editor flex'>
//       <CheckBoxOutlinedIcon
//         display={todo.isDone ? 'block' : 'none'}
//       />
//       <div className='flex column'>
//         <TextareaAutosize value={todo.title} />
//         <div className='checklist-controllers flex align-center'>
//           <button className='secondary-btn'>Save</button>
//           <CloseRoundedIcon className='close-svg' />
//         </div>
//       </div>
//       )
//     </div>
//   ))}
//   <div>
//     <div>Todo List</div>
//     <TextField value='Todo add' />
//     <button>Todo Add</button>
//   </div>
// </div>
//style={{marginInlineEnd:'10px'}}
