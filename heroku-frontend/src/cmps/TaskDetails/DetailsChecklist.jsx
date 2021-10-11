import React, { useState, useEffect } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Checkbox from 'rc-checkbox';
import { ProgressBar } from './ProgressBar';
import { boardService } from '../../services/board-service';

export function DetailsChecklist({ task, sendTask, togglePopover }) {
  const [listStateVal, createListVal] = React.useState(
    task.checklists ? task.checklists : ''
  );
  const [removedChecklist, setRemovedChecklist] = React.useState(null)
  useEffect(() => {
    sendTask(false, { ...task, checklists: listStateVal }, removedChecklist);
  }, [listStateVal]);
  const onChange = (e, idx) => {
    const copyList = [...task.checklists];
    copyList[idx].checked = e.target.checked;
    createListVal(copyList);
  };
  const removeCheck = (idx) => {
    setRemovedChecklist(task.checklists[idx].title)
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
      <ProgressBar task={task} />
      <ul className="clean-list">{list}</ul>
    </div>
  );
}