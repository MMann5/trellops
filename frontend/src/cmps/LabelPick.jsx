import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import Checkbox from 'rc-checkbox';

import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export function LabelPick({ props, setCurrPopover, sendTask }) {
  const getLabels = () => {};
  const { board } = useSelector((state) => state.boardModule);
  const [stateVal, createStateVal] = React.useState({});
  const [labelStateVal, createLabelVal] = React.useState(
    board.labels.map((boardLabel) => {
      if (props.labels.some((label) => label.id === boardLabel.id)) {
        return { ...boardLabel, checked: true };
      } else {
        return { ...boardLabel, checked: false };
      }
    })
  );

  const onChange = (e, idx) => {
    const copyLabel = [...labelStateVal];
    copyLabel[idx].checked = e.target.checked;
    createLabelVal(copyLabel);
    const copySend = [...copyLabel];
    console.log(copyLabel);
    console.log(copySend);
    const checkedLabels = copySend.filter((label) => label.checked);
    sendTask(false, { ...props, labels: checkedLabels });
  };

  const labels = labelStateVal.map((val, idx) => {
    console.log(val);
    return (
      <li
        className='label'
        key={idx}
        style={{
          backgroundColor: val.color,
          color: 'white',
          padding: 5,
          marginBottom: 10,
          height: '50px',
          width: '100%',
        }}
      >
        <Checkbox
          onChange={(ev) => onChange(ev, idx)}
          checked={val.checked}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
        />
        {val.title}
      </li>
    );
  });

  return (
    <div className='checklist'>
      <div className='nav-option-header justify-center card-details-labels'>
        {/* <h3>Add a Labels</h3> */}
        <ul className='labels-container'>{labels}</ul>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className='close-x' />
        </button>
      </div>
    </div>
  );
}
