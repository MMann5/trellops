import React, { useState, useEffect } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { TextareaAutosize, TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Checkbox from 'rc-checkbox';

export function TaskCheckList({ task, sendTask }) {
  const [listStateVal, createListVal] = React.useState(
    task.checklists ? task.checklists : ''
  );
  console.log(task);
  console.log(listStateVal);
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
          <li key={idx}>
            <Checkbox
              onChange={(ev) => onChange(ev, idx)}
              checked={val.checked}
            />
            <span
              style={{
                marginInlineStart: '10px',
                marginInlineEnd: '10px',
              }}
            >
              {val.title}
            </span>
            <button
              style={{
                marginInlineStart: '10px',
              }}
              onClick={() => removeCheck(idx)}
              className='checkbox-btn clean-btn'
            >
              x
            </button>
          </li>
        );
      })
    : '';
  return <ul>{list}</ul>;
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
