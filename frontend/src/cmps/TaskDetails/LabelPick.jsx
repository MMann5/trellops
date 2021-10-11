import React from 'react';
import { useSelector } from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export function LabelPick({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const getLabels = () => { };
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
    const checkedLabels = copySend.filter((label) => label.checked);
    const activityItem = { label: copyLabel[idx].title, isChecked: e.target.checked }
    sendTask(false, { ...props, labels: checkedLabels}, activityItem);
  };

  const labels = labelStateVal.map((val, idx) => {
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
    <div
      className='checklist'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}
    >
      <div className='nav-option-header flex align-center'>
        <button className='clean-btn hide'>
          <CloseRoundedIcon />
        </button>
        <h3>Labels</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <ul className='labels-container clean-list'>{labels}</ul>
    </div>
  );
}
