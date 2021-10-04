import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Checkbox from 'rc-checkbox';
import { utilService } from '../services/util-service';

export function Checklist({ props, setCurrPopover, sendTask }) {
  const [stateVal, createStateVal] = React.useState({});
  const [listStateVal, createListVal] = React.useState(
    props.checklists ? props.checklists : []
  );
  useEffect(() => {
    sendTask(false, { ...props, checklists: listStateVal });
  }, [listStateVal]);
  return (
    <div className='checklist'>
      <div className='nav-option-header flex justify-center'>
        <h3>Add a Checklist</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className='close-x' />
        </button>
      </div>
      <TextField
        fullWidth
        size='small'
        margin='normal'
        variant='outlined'
        placeholder='Enter a title...'
        fontFamily='SourceSans-Light'
        onChange={(ev) =>
          createStateVal({
            id: utilService.makeId(),
            title: ev.target.value,
            checked: false,
          })
        }
        value={stateVal.title ? stateVal.title : ''}
      />
      <div>
        <button
          className='blue-btn'
          onClick={() => {
            createListVal([...listStateVal, stateVal]);
            createStateVal({});
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
