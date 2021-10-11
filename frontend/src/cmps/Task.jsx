import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TimerIcon from '@mui/icons-material/Timer';
import { Link } from 'react-router-dom';
import SubjectIcon from '@material-ui/icons/Subject';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export function Task({
  task,
  groupId,
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
            {task.description ? <span><SubjectIcon fontSize="small"/></span> : ''}
            {task.checklists && task.checklists.length ? (
                <span style={(progressData.percent === 100) ? { backgroundColor: '#61bd4f' } : {}}>
                  <CheckBoxOutlinedIcon fontSize="small" />
                </span>
                // {/* <span className='prog-percent-span'>{progressData.string}</span> */}
              ) : ''}
              {task.comments.length ?  <span><ChatBubbleOutlineIcon fontSize="small" /></span> : ''}
            {task.dueDate ? <span><TimerIcon fontSize="small" /></span> : ''}
              {task.attachments && task.attachments.length ? (
                <span><AttachFileIcon fontSize="small" /></span>
              ) : (
                ''
              )}
          </div>
          <div className='avatar'>
            {task.members?.map((member, idx) => {
              return (
                <span key={idx} className='avatar-img'>
                  <Stack direction='row' spacing={2}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
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
