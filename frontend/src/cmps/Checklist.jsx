import React from 'react';
import { TextField } from '@material-ui/core';
import Checkbox from 'rc-checkbox';
export function Checklist({closePopup}) {
  const [stateVal, createStateVal] = React.useState({});
  const [listStateVal, createListVal] = React.useState([]);
  function onChange(e, idx) {
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
      <li key={idx}>
        <Checkbox onChange={(ev) => onChange(ev, idx)} />
        {val.title}
        <button onClick={() => removeCheck(idx)}>x</button>
      </li>
    );
  });

  return (
    <div className='checklist'>
      <button onClick={()=>{closePopup('isCheckOpen')}}>x</button>
      <TextField
        fullWidth
        size='small'
        margin='normal'
        variant='outlined'
        onChange={(ev) =>
          createStateVal({ title: ev.target.value, checked: false })
        }
        value={stateVal.title ? stateVal.title : ''}
      />
      <div>
        <button
          onClick={() => {
            createListVal([...listStateVal, stateVal]);
            createStateVal({});
          }}
        >
          add
        </button>
      </div>
      <div className='checklist-display'>
        <ul>{list}</ul>
      </div>
    </div>
  );
}
