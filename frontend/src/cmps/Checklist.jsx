import React from 'react';

import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Checkbox from 'rc-checkbox';

export function Checklist({ setCurrPopover }) {
  const [stateVal, createStateVal] = React.useState({});
  const [listStateVal, createListVal] = React.useState([]);

  const onChange = (e, idx) => {
    const copyList = [...listStateVal];
    copyList[idx].checked = e.target.checked;
    createListVal(copyList);
  }
  const removeCheck = (idx) => {
    const listCopy = [...listStateVal];
    listCopy.splice(idx, 1);
    createListVal(listCopy);
  };

  const list = listStateVal.map((val, idx) => {
    return (
      <li key={idx} className="d">
        <Checkbox onChange={(ev) => onChange(ev, idx)} />
        {val.title}
        <button onClick={() => removeCheck(idx)} className="checkbox-btn clean-btn">x</button>
      </li>
    );
  });

  return (
    <div className='checklist'>
      <div className="nav-option-header flex justify-center">
        <h3>Add a Checklist</h3>
        <button className="clean-btn" onClick={() => { setCurrPopover(null) }}>
          <FontAwesomeIcon icon={faTimes} className="close-x" />
        </button>
      </div>
      <TextField
        fullWidth
        size='small'
        margin='normal'
        variant='outlined'
        placeholder="Enter a title..."
        fontFamily='SourceSans-Light'
        onChange={(ev) =>
          createStateVal({ title: ev.target.value, checked: false })
        }
        value={stateVal.title ? stateVal.title : ''}
      />
      <div>
        <button
          className="blue-btn"
          onClick={() => {
            createListVal([...listStateVal, stateVal]);
            createStateVal({});
          }}
        >
          Add
        </button>
      </div>
      <div className='checklist-display'>
        <ul>{list}</ul>
      </div>
    </div>
  );
}
