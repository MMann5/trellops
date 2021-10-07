import React, { useState } from 'react';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { TextField } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import { Link } from 'react-router-dom';
import SubjectIcon from '@material-ui/icons/Subject';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
export function Task({
  task,
  onRemoveTask,
  groupId,
  onSetTask,
  boardId,
}) {

  const GetProgPercent = () => {
    const sumOfTasks = task.checklists?.length;
    let doneTasks = 0;
    task.checklists?.forEach(todo => {
      if (todo.checked === true) doneTasks++
    });
    const progressString = `${doneTasks}/${sumOfTasks}`
    const progressPercent = Math.floor((doneTasks / sumOfTasks) * 100)
    const progressData = { percent: progressPercent, string: progressString }
    return progressData;
  }
  const progressData = GetProgPercent()

  return (
    <div
      className='task-preview'
      style={{ backgroundColor: task.bgColor }}
    >
      {task.attachments.length > 0 ? (
        <div
          className='task-background'
          style={{
            backgroundImage: `url(${task.attachments[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      ) : (
        ''
      )}
      <Link to={`/board/${boardId}/${groupId}/${task.id}`} className='clean-link'>
        <div className='label-view'>
          {task.labels?.map((label, idx) => {
            return (
              <span
                className='labels-task'
                style={{ backgroundColor: label.color }}
                key={idx}
              >
                {label.title}
              </span>
            );
          })}
        </div>
        <div className="task-title" style={{ color: 'black' }}>
          <span>{task.title ? task.title : 'Click To Set Title'}</span>
        </div>
        <div className='task-btns'>
          <div className='sign-task flex align-center'>
            <span>{task.description ? <SubjectIcon fontSize="small" /> : ''}</span>
            {task.checklists && task.checklists.length ? (
              <div className='progress-container'>
                <span>
                  <CheckBoxOutlinedIcon fontSize="small" style={(progressData.percent === 100) ? { backgroundColor: '#61bd4f', padding: '2px', 'width': '20px', borderRadius: '2px' } : {}} />
                </span>
                <span className='prog-percent-span'>{progressData.string}</span>
              </div>) : ('')}

            <span>
              {task.comments.length ? <ChatBubbleOutlineIcon fontSize="small" /> : ''}
            </span>
            <span>{task.dueDate ? <TimerIcon fontSize="small" /> : ''}</span>
            <span>
              {task.attachments && task.attachments.length ? (
                <AttachFileIcon fontSize="small" />
              ) : (
                ''
              )}
            </span>
          </div>
          <div className='avatar'>
            {task.members?.map((member, idx) => {
              return (
                <span key={idx} className='avatar-img'>
                  <Stack direction='row' spacing={2}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        // bgcolor: deepOrange[300],
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        backgroundColor: member.avatarColor,
                      }}
                    >
                      {member.fullname
                        ? member.fullname.charAt(0)
                        : ''}
                    </Avatar>
                  </Stack>
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
