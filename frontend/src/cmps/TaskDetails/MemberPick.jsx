import React from 'react';
import { useSelector } from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Checkbox from 'rc-checkbox';

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
        <img src={require(`../../assets/imgs/profiles/${val.imgUrl}`).default} alt="" />
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
