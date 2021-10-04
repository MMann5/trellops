import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@material-ui/core';
import Checkbox from 'rc-checkbox';
import David from '../assets/imgs/profiles/david.jpg';
import Michael from '../assets/imgs/profiles/michael.png';
import Ron from '../assets/imgs/profiles/ron.png';
import Tal from '../assets/imgs/profiles/tal.jpg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export function MemberPick({ props, setCurrPopover, sendTask }) {
  const getMembers = () => {
    return board.members.map((boardMember) => {
      return props.members.length > 0
        ? props.members.find(
            (member) => member._id === boardMember._id
          )
        : false
        ? { ...boardMember, checked: true }
        : boardMember;
    });
  };
  const { board } = useSelector((state) => state.boardModule);
  const [stateVal, createStateVal] = React.useState({});
  const [memberStateVal, createMemberVal] = React.useState(
    getMembers()
  );

  const onChange = (e, idx) => {
    const copyMember = [...memberStateVal];
    copyMember[idx].checked = e.target.checked;
    createMemberVal(copyMember);
    const copySend = [...copyMember];
    console.log(copyMember);
    console.log(copySend);
    const checkedMembers = copySend.filter(
      (member) => member.checked
    );
    sendTask(false, { ...props, members: checkedMembers });
  };

  const members = memberStateVal.map((val, idx) => {
    return (
      <li key={idx}>
        <Checkbox
          onChange={(ev) => onChange(ev, idx)}
          checked={val.checked}
        />
        {val.fullname}
      </li>
    );
  });

  return (
    <div className='checklist'>
      <div className='nav-option-header flex justify-center'>
        <h3>Add Members</h3>
        <ul>{members}</ul>
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
