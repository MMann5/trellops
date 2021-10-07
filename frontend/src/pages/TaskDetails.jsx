import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PaperClipIcon } from '../assets/imgs/icons/paperclip-solid.svg';
import { ReactComponent as MemberIcon } from '../assets/imgs/icons/person.svg';

import Swal from 'sweetalert2';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Ron from '../assets/imgs/profiles/ron.png';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SubjectIcon from '@material-ui/icons/Subject';
import { TextareaAutosize } from '@material-ui/core';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined';
import CoverIcon from '@material-ui/icons/VideoLabel';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import { TaskMembers } from '../cmps/TaskDetails/TaskMembers';
import { ModalDetailsLables } from '../cmps/ModalDetailsLables';
import { onSaveBoard } from '../store/actions/boards-actions';
import { utilService } from '../services/util-service';
import { addComment } from '../services/board-service';
import { DynamicPopover } from '../cmps/DynamicPopover';
import { TaskCheckList } from '../cmps/TaskDetails/TaskChecklist';
import { TaskAttachments } from '../cmps/TaskDetails/TaskAttachments';
import { ModalDetailsDate } from '../cmps/ModalDetailsDate';
import { ModalDetailsComments } from '../cmps/ModalDetailsComments';

export function TaskDetails({ props, board }) {
  const groupId = props.match.params.groupIdId;
  const taskId = props.match.params.taskId;

  const getGroup = (groupId) => {
    const currGroup = board.groups.find(
      (value) => value.id === groupId
    );
    return currGroup;
  };
  const getTask = (taskId) => {
    const currTask = group.tasks.find((task) => {
      return task.id === taskId;
    });
    return currTask;
  };
  const [boardId, setBoardId] = useState(props.match.params.boardId);
  const [group, setGroup] = useState(getGroup(groupId));
  const [task, setTask] = useState(getTask(taskId));
  const [commentVal, setCommentVal] = useState('');
  const [descVal, setDescVal] = useState(task.description);
  const [currPopover, setCurrPopover] = useState('');
  const [currProps, setCurrProps] = useState('');
  const [currPopoverPos, setCurrPopoverPos] = useState('');

  const togglePopover = (ev, name) => {
    console.log('ev.target', ev.target);
    setCurrPopoverPos(getPopoverPos(ev.target));
    setCurrPopover(name);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    sendTask(false);
  }, [task.comments]);
  useEffect(() => {
    sendTask(false, { ...task, description: descVal });
  }, [descVal]);

  const sendTask = (isRemove, sentTask) => {
    const currGrp = board.groups.find(
      (group) => group.id === groupId
    );
    const grpIdx = board.groups.findIndex(
      (group) => group.id === groupId
    );
    const taskIdx = currGrp.tasks.findIndex(
      (task) => task.id === taskId
    );
    isRemove
      ? currGrp.tasks.splice(taskIdx, 1)
      : currGrp.tasks.splice(taskIdx, 1, sentTask ? sentTask : task);
    board.groups.splice(grpIdx, 1, currGrp);
    dispatch(onSaveBoard(board));
    if (isRemove) {
      closeModal();
    }
    if (sentTask) {
      setTask(sentTask);
    }
  };

  const setCopyTask = () => {
    const grpIdx = board.groups.findIndex(
      (group) => group.id === groupId
    );
    const taskCpy = { ...task, id: utilService.makeId() };
    board.groups[grpIdx].tasks.push(taskCpy);
    dispatch(onSaveBoard(board));
    closeModal();
  };

  const modalAlert = () => {
    Swal.fire({
      title: 'Do you want to delete this task?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success');
        sendTask(true);
      }
    });
  };

  const closeModal = () => {
    props.history.push(`/board/${boardId}`);
  };

  const onAddComment = () => {
    const taskComments = task.comments;
    setTask((prevState) => {
      return {
        ...prevState,
        comments: [...taskComments, addComment(commentVal)],
      };
    });
  };

  const getPopoverPos = (target) => {
    const targetPos = target.getBoundingClientRect();
    console.log('targetPos', targetPos);
    const newBottom = targetPos.bottom + 6;
    const newLeft = targetPos.left;
    console.log('newLeft', newLeft);
    console.log('newBottom', newBottom);
    return { leftPos: newLeft, topPos: newBottom };
  };

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
    console.log('Window size:', width, 'x', height);
    // return <span>Window size: {width} x {height}</span>;
  }

  return (
    <section className='card-details-container'>
      <section className='card-details flex column'>
        <button className='close-window-btn' onClick={closeModal}>
          <CloseRoundedIcon />
        </button>
        <div className='card-details-header'>
          <div className='header-content flex'>
            <WebAssetIcon />
            <TextareaAutosize
              onChange={(ev) =>
                sendTask(false, { ...task, title: ev.target.value })
              }
              value={task.title}
              placeholder='Write A New Task'
              aria-label='empty textarea'
            />
          </div>
          <p className='bottom-list-name'>
            in list
            <span>{group ? group.title : 'No List'}</span>
          </p>
        </div>
        <div className='card-details-main-container'>
          <div className='card-details-main flex column'>
            <div className='card-details-items flex wrap'>
              <div className='card-details-members item-container flex column'>
                <div
                  className='card-details-labels item-container flex column align-flex-end'
                  style={{ marginTop: '10px' }}
                >
                  <h3 className='card-details-item-header'>
                    {task.members.length ? 'Members' : ''}
                  </h3>
                  <div className='labels-container flex wrap'>
                    <TaskMembers
                      members={task.members ? task.members : []}
                      onClick={(ev) => {
                        togglePopover('MEMBERS');
                      }}
                    />
                  </div>
                </div>

                {task.labels.length > 0 && (
                  <div
                    className='card-details-labels item-container flex column align-flex-end'
                    style={{ marginTop: '10px' }}
                  >
                    <h3 className='card-details-item-header'>
                      Labels
                    </h3>
                    <div className='labels-container flex wrap'>
                      <ModalDetailsLables labels={task.labels} />
                    </div>
                  </div>
                )}
                {task.dueDate ? (
                  <ModalDetailsDate
                    sendTask={sendTask}
                    task={task}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='card-description flex column'>
              <div className='window-modal-title flex align-center'>
                <SubjectIcon />
                <h3>Description</h3>
              </div>
              <div className='card-description-edit flex column'>
                <TextareaAutosize
                  value={descVal}
                  onChange={(ev) => setDescVal(ev.target.value)}
                />
              </div>
            </div>
            {task.attachments && task.attachments.length > 0 && (
              <div className='card-description'>
                <div className='window-modal-title flex align-center'>
                  <PaperClipIcon />
                  <h3>Attachments</h3>
                </div>
                <div className='card-checklists '>
                  <TaskAttachments task={task} sendTask={sendTask} />
                </div>
              </div>
            )}
            {task.checklists && task.checklists.length > 0 && (
              <div className='card-description'>
                <div className='window-modal-title flex align-center'>
                  <CheckBoxOutlinedIcon />
                  <h3>Checklist</h3>
                </div>
                <div className='card-checklists'>
                  <TaskCheckList
                    task={task}
                    sendTask={sendTask}
                    togglePopover={togglePopover}
                  />
                </div>
              </div>
            )}

            <div className='card-activities flex column'>
              <div className='window-modal-title flex justify-space-between'>
                <div className='flex align-center'>
                  <FormatListBulletedIcon />
                  <h3>Comments</h3>
                </div>
              </div>
              <div className='comment-add flex'>
                <img
                  src={Ron}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                  }}
                />
                <div className='comment-editor flex column justify-space-between full'>
                  <TextareaAutosize
                    placeholder='Write a comment'
                    onChange={(ev) => setCommentVal(ev.target.value)}
                    value={commentVal}
                    // style={fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif'}
                  />
                </div>
                <button
                  className='secondary-btn'
                  onClick={onAddComment}
                >
                  Send
                </button>
              </div>
              <div>
                {task.comments.length ? (
                  <ModalDetailsComments task={task} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='card-details-sidebar flex column full'>
            <div className='details-actions-wrapper flex'>
              <div className='add-section flex column'>
                <button
                  className='secondary-btn actions-btn '
                  onClick={(ev) => togglePopover(ev, 'MEMBERS')}
                >
                  <div className='actions-btn-content flex align-center '>
                    <MemberIcon />
                    <span>Members</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>
                <button
                  className='secondary-btn actions-btn'
                  onClick={(ev) => togglePopover(ev, 'LABELS')}
                >
                  <div className='actions-btn-content flex align-center'>
                    <LabelIcon />
                    <span>Labels</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>

                <button
                  className='secondary-btn actions-btn'
                  onClick={(ev) => togglePopover(ev, 'CHECKLISTS')}
                >
                  <div className='actions-btn-content flex align-center'>
                    <CheckboxIcon />
                    <span>Checklist</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>

                <button
                  className='secondary-btn actions-btn'
                  onClick={(ev) => togglePopover(ev, 'DATE')}
                >
                  <div className='actions-btn-content flex align-center'>
                    <CalendarTodayIcon />
                    <span>Date</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>

                <button
                  className='secondary-btn actions-btn'
                  onClick={(ev) => togglePopover(ev, 'ATTACHMENT')}
                >
                  <div className='actions-btn-content flex align-center'>
                    <AttachFileIcon />
                    <span>Attachment</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>

                <button
                  className='secondary-btn actions-btn'
                  onClick={(ev) => togglePopover(ev, 'COVER')}
                >
                  <div className='actions-btn-content flex align-center'>
                    <CoverIcon />
                    <span>Cover</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>
              </div>
              <div className='actions-section flex column'>
                <button
                  className='secondary-btn actions-btn'
                  onClick={setCopyTask}
                >
                  <div className='actions-btn-content flex align-center'>
                    <CopyIcon />
                    <span>Copy</span>
                  </div>
                  <span className='element-overlay'></span>
                </button>
                <button
                  className='secondary-btn actions-btn danger-btn'
                  onClick={modalAlert}
                >
                  <div className='actions-btn-content  flex align-center'>
                    <MinusIcon className='remove' />
                    <span>Delete</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {currPopover && (
          <DynamicPopover
            name={currPopover}
            props={task}
            popoverPos={currPopoverPos}
            setCurrPopover={setCurrPopover}
            sendTask={sendTask}
          />
        )}
      </section>
    </section>
  );
}
