import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import ron from '../assets/imgs/profiles/ron.png';
import {
    loadBoard,
    onSaveBoard,
    setBoards,
  } from '../store/actions/boards-actions.js';
import { useDispatch, useSelector } from 'react-redux';
export function MemberPick({props, setCurrPopover}) {
    const dispatch = useDispatch();
    const members = props[0].members
    const checkMemberInTask = (memberId) => {
        const taskMembers = props[2].members
        const isInTask = taskMembers.find(member => member._id === memberId)
        if (isInTask) return true;
        else return false;
    }
    const toggleMember = (member) => {
        const board = props[0]
        const task = props[2]
        const isInTask = checkMemberInTask(member._id)
        if (isInTask) {
            const memberIdx = task.members.findIndex(currMember => currMember._id === member._id)
            task.members.splice(memberIdx, 1)
        } else {
            task.members.push(member)
        }
        const groupId = props[1]
        const currGrp = board.groups.find(group => group.id === groupId)
        const taskIdx = currGrp.tasks.findIndex(currTask => currTask._id === task._id)
        const currGrpIdx = board.groups.findIndex(group => group.id === groupId)
        currGrp.tasks.splice(taskIdx, 1, task)
        board.groups.splice(currGrpIdx, 1, currGrp)
        dispatch(onSaveBoard(board));
    }

    return(
            <div className="member-pick">
                <div className="nav-option-header flex justify-center">
                    <h3>Members</h3>
                    <button className="clean-btn" onClick={() => { setCurrPopover(null) }}>
                        <FontAwesomeIcon icon={faTimes} className="close-x" />
                    </button>
                </div>
                <div className="member-container">
                    <h4>Board Members</h4>
                    <ul className="member-list clean-list">
                        {members?.map((member, idx) => {
                            return <li key={idx} className='profile-container flex align-center' onClick={() => { toggleMember(member) }}>
                                <img src={`../assets/imgs/profiles/${member.imgUrl}`} alt='' />
                                <span>{member.fullname}</span> <span>{checkMemberInTask(member._id) && '✓'}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
}
