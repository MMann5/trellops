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
    const progressPercent = (doneTasks / sumOfTasks) * 100
    return Math.floor(progressPercent);
  }
  const progressPercent = GetProgPercent()

  return (
    <div
      className='task-preview'
      style={{ backgroundColor: task.bgColor }}
    >
      {task.attachments ?
        <div className='task-background' style={{ backgroundImage: `url(${task.attachments[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div> : ''
      }
      <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
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
        <p style={{ color: 'black' }}>
          {task.title ? task.title : 'Click To Set Title'}
        </p>
        <div className='task-btns'>
          <div className='sign-task'>
            <span>{task.description ? <SubjectIcon /> : ''}</span>
            <span>
              {task.checklists && task.checklists.length ? (
                <CheckBoxOutlinedIcon style={(progressPercent===100)?{ backgroundColor: '#61bd4f', padding: '2px', 'width': '20px', borderRadius: '2px' }:{}} />
              ) : (
                ''
              )}
            </span>
            <span>
              {task.comments.length ? (
                <ChatBubbleOutlineIcon />
              ) : (
                ''
              )}
            </span>
            <span>{task.dueDate ? <TimerIcon /> : ''}</span>
            <span>
              {task.attachments && task.attachments.length ? (
                <AttachFileIcon />
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
                        fontSize: "0.85rem",
                        fontWeight: 400,
                        backgroundColor: member.avatarColor
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
