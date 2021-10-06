import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Popover } from '@material-ui/core';
import Checkbox from 'rc-checkbox';
import David from '../assets/imgs/profiles/david.jpg';
import Michael from '../assets/imgs/profiles/michael.png';
import Ron from '../assets/imgs/profiles/ron.png';
import Tal from '../assets/imgs/profiles/tal.jpg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export function MemberPick({ props, setCurrPopover, sendTask, popoverPos }) {
  const { board } = useSelector((state) => state.boardModule);
  const [stateVal, createStateVal] = React.useState({});
  const [memberStateVal, createMemberVal] = React.useState(
    board.members.map((boardMember) => {
      if (
        props.members.some(
          (member) => member._id === boardMember._id
        )
      ) {
        return { ...boardMember, checked: true };
      } else {
        return { ...boardMember, checked: false };
      }
    })
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
        <img src={require(`../assets/imgs/profiles/${val.imgUrl}`).default} alt="" />
        <Checkbox
          onChange={(ev) => onChange(ev, idx)}
          checked={val.checked}
        />
        {val.fullname}
      </li>
    );
  });

  return (
    <div className='checklist and-member-pick'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}>
      <div className='nav-option-header flex align-center'>
        <button
          className='clean-btn hide'
        >
          <CloseRoundedIcon />
        </button>
        <h3>Add Members</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <ul>{members}</ul>
    </div>
  );
}
