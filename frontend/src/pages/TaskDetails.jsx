import React, { useState, useEffect } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ReactComponent as AddIcon } from '../assets/imgs/icons/add.svg'
import { ReactComponent as PaperClipIcon } from '../assets/imgs/icons/paperclip-solid.svg'
import { ReactComponent as MemberIcon } from '../assets/imgs/icons/person.svg'
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import ron from '../assets/imgs/profiles/ron.png';
import SubjectIcon from '@material-ui/icons/Subject';
import { TextareaAutosize, TextField } from '@material-ui/core';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined'
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import CoverIcon from '@material-ui/icons/VideoLabel';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { TaskMembers } from '../cmps/TaskDetails/TaskMembers';
import { MemberPick } from '../cmps/MemberPick';
import { FileAttachment } from '../cmps/FileAttachment'
import { ModalDetailsLables } from '../cmps/ModalDetailsLables'
import { TaskAttachments } from '../cmps/TaskDetails/TaskAttachments';
import { TaskCheckList } from '../cmps/TaskDetails/TaskChecklist';
import { DynamicPopover } from '../cmps/DynamicPopover';
export function TaskDetails({ props, board }) {
    const [task, setTask] = useState(null)
    const [boardId, setBoardId] = useState(null)
    const [group, setGroup] = useState(null)
    const [currPopover, setCurrPopover] = useState('')
    const [currProps, setCurrProps] = useState('')
    useEffect(() => {
        if (props.match.params.boardId) {
            setBoardId(props.match.params.boardId)
        } if (props.match.params.groupIdId) {//DOn't know why grouId is named groupIdId
            const currGroup = getGroup(props.match.params.groupIdId)
            setGroup(currGroup)
        } if (props.match.params.taskId) {
            const currTask = getTask(props.match.params.taskId)
            setTask(currTask)
        }
    })
    const getGroup = (groupId) => {
        const currGroup = board.groups.find(
            (value) => value.id === groupId
        );
        return currGroup
    }
    const getTask = (taskId) => {
        const currTask = group?.tasks.find(task => {
            return task.id === taskId
        })
        return currTask
    }
    const closeModal = () => {
        props.history.push(`/board/${boardId}`)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const togglePopover = (name, props) => {
        setCurrPopover(name)
        setCurrProps(props)
        console.log('details props', props);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <section className="card-details-container">
            <section className="card-details flex column">
                <button className="close-window-btn" onClick={closeModal}> <CloseRoundedIcon /></button>
                <div className="card-details-header">
                    <div className="header-content flex">
                        <WebAssetIcon />
                        <TextareaAutosize value={(task) ? task.title : null}
                            aria-label="empty textarea"
                        />
                    </div>
                    <p className="bottom-list-name">
                        {(group) ? group.title : 'No List'}
                    </p>
                </div>
                <div className="card-details-main-container">
                    <div className="card-details-main flex column">
                        <div className="card-details-items flex wrap">
                            <div className="card-details-members item-container flex column">
                                <h3 className="card-details-item-header">Members</h3>
                                <TaskMembers members={(task) ? task.members : null} />
                                <div className="card-details-labels item-container flex column align-flex-end">
                                    <h3 className="card-details-item-header">Labels</h3>
                                    <div className="labels-container flex wrap">
                                        <ModalDetailsLables labels={(task) ? task.labels : null} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-description flex column">
                            <div className="window-modal-title flex align-center">
                                <SubjectIcon />
                                <h3>Description</h3>
                            </div>
                            <div className="card-description-edit flex column">
                                <TextareaAutosize
                                    value={(task) ? task.description : 'No description'}
                                />
                            </div>
                        </div>
                        <div className="card-attachments">
                            <div className="card-attachments">
                                <div className="window-modal-title flex align-center">
                                    <PaperClipIcon />
                                    <h3>Attachments</h3>
                                </div>
                                <div className="attachments-container">
                                    <a href='/#' className="clean-link">
                                        <TaskAttachments task={task} />
                                    </a>
                                </div>
                                <button className="secondary-btn"
                                >Add an attachment</button>
                            </div>
                        </div>
                        <div className="card-checklists" >
                            {/* <div className="checklist-preview">
                                <div className="window-modal-title flex align-center justify-space-between">
                                    <div className="flex align-center">
                                        <CheckBoxOutlinedIcon />
                                        <h3>checklist title</h3>
                                    </div>
                                    <button
                                        className="secondary-btn">Delete</button>
                                </div> */}
                            <TaskCheckList task={task} />
                            {/* <div>
                                    <div>Todo List</div>
                                    <TextField value='Todo add'
                                    />
                                    <button>Todo Add</button>
                                </div>

                            </div> */}
                        </div>
                        <div className="card-activities flex column">
                            <div className="window-modal-title flex justify-space-between">
                                <div className="flex align-center">
                                    <FormatListBulletedIcon />
                                    <h3>Comments</h3>
                                </div>
                            </div>
                            <div className="comment-add flex">
                                <img src={ron} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                <div
                                    className="comment-editor flex column justify-space-between full">
                                    <TextareaAutosize
                                        placeholder="Write a comment"
                                    />
                                    {/* <button
                                        type="submit"
                                        className="secondary-btn">
                                        Save
                                    </button> */}
                                </div>
                                <button
                                    type="submit"
                                    className="secondary-btn">
                                    Save
                                </button>
                            </div >
                        </div>
                    </div>
                    <div className="card-details-sidebar flex column full">
                        <div className="details-actions-wrapper flex">
                            <div className="add-section flex column">
                                <button className="secondary-btn actions-btn " onClick={() => togglePopover('MEMBERS', [board, group.id, task])}>
                                    <div className="actions-btn-content flex align-center">
                                        <MemberIcon />
                                        <span>Members</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>
                                <button className="secondary-btn actions-btn"  onClick={() => togglePopover('LABELS', board.labels)}>
                                    <div className="actions-btn-content flex align-center">
                                        <LabelIcon />
                                        <span>Labels</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>


                                <button className="secondary-btn actions-btn" onClick={() => togglePopover('CHECKLIST', task)}>
                                    <div className="actions-btn-content flex align-center">
                                        <CheckboxIcon />
                                        <span>Checklist</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>


                                <button className="secondary-btn actions-btn" onClick={() => togglePopover('DATE')}>
                                    <div className="actions-btn-content flex align-center">
                                        <FontAwesomeIcon icon={faCalendarDay} />
                                        <span>Date</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>


                                <button className="secondary-btn actions-btn" onClick={() => togglePopover('ATTACHMENTE')}>
                                    <div className="actions-btn-content flex align-center">
                                        <FontAwesomeIcon icon={faPaperclip} />
                                        <span>Attachment</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>


                                <button className="secondary-btn actions-btn"  onClick={() => togglePopover('COVER')}>
                                    <div className="actions-btn-content flex align-center">
                                        <CoverIcon />
                                        <span>Cover</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>


                            </div>
                            <div className="actions-section flex column">
                                <button className="secondary-btn actions-btn">
                                    <div className="actions-btn-content flex align-center">
                                        <CopyIcon />
                                        <span>Copy</span>
                                    </div>
                                    <span className="element-overlay"></span>
                                </button>
                                <button className="secondary-btn actions-btn danger-btn">
                                    <div className="actions-btn-content  flex align-center">
                                        <MinusIcon className="remove" />
                                        <span>Delete</span>
                                    </div>
                                </button>
                            </div>
                            {currPopover && <DynamicPopover name={currPopover} props={currProps} setCurrPopover={setCurrPopover}/>}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}