import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export function ActivityList({ board }) {
  const activities = board.activities;
  activities.reverse();
  // const lastActivities = activities.slice(Math.max(activities.length - 20, 0))
  const lastActivities = activities;
  const organizeActivity = (
    actionType,
    txt,
    taskOrGroup,
    fullname
  ) => {
    let name = <span className='activity-member'>{fullname}</span>;
    let destination = <span>{taskOrGroup}</span>;
    let item = <span className='txt-underline'>{txt}</span>;
    switch (actionType) {
      case 'new group':
        return <div>{name}added a new list to this board</div>;
      case 'new task':
        return (
          <div>
            {name}
            <span>added a new task to </span>
            {destination}
          </div>
        );
      case 'removed group':
        return (
          <div>
            {name}
            <span>removed list </span>
            {taskOrGroup}
          </div>
        );
      case 'task removed':
        return (
          <div>
            {name}
            <span>removed </span>
            {item}
            <span> from </span>
            {taskOrGroup}
          </div>
        );
      case 'added checklist':
        return (
          <div>
            {name}
            <span>added </span>
            {item}
            <span> to a checklist in </span>
            {taskOrGroup}
          </div>
        );
      case 'removed checklist':
        return (
          <div>
            {name}
            <span>removed </span>
            {item}
            <span> from a checklist in </span>
            {taskOrGroup}
          </div>
        );
      case 'added attachment':
        return (
          <div>
            {name}
            <span>attached a file to </span>
            {destination}
          </div>
        );
      case 'deleted attachment':
        return (
          <div>
            {name}
            <span>removed an attachment from </span>
            {destination}
          </div>
        );
      // case 'dragged task':
      //   return `moved ${item} to ${taskOrGroup}`
      case 'add label':
        return (
          <div>
            {name}
            <span>added </span>
            {item} <span> label to </span>
            {destination}
          </div>
        );
      case 'add member':
        return (
          <div>
            {name}
            <span>added </span>
            {item} <span> </span>
            {destination}
          </div>
        );
    }
  };
  const activityList = (
    <Box
      sx={{
        width: 339,
      }}
      role='presentation'
    >
      <List>
        <div className='activities-header flex align-center'>
          <FormatListBulletedIcon
            style={{ fontSize: '14px', marginLeft: '1px' }}
          />
          <span className='activities-header-txt'>Activity</span>
        </div>
        {lastActivities.map((activity, index) => (
          <ListItem button key={index} onClick={(ev) => {}}>
            <div className='flex column'>
              <div className='flex align-center'>
                {activity.byMember.imgUrl !== 'http://some-img' && (
                  <img
                    src={
                      require(`../assets/imgs/profiles/${activity.byMember.imgUrl}`)
                        .default
                    }
                    alt=''
                  />
                )}
                <div className='nav-txt-container flex align-center'>
                  <span>
                    {organizeActivity(
                      activity.actionType,
                      activity.txt,
                      activity.taskOrGroup?.title,
                      activity.byMember.fullname
                    )}
                  </span>
                  {/* <span className='taskOrGroup'>{activity.taskOrGroup?.title}</span> */}
                </div>
              </div>
              <div className='date flex'>
                {new Date(activity.createdAt).toLocaleDateString()}
              </div>
            </div>
            <ListItemText
              style={{
                backgroundColor: '#fff',
                height: '50px',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return <div className='activity-list'>{activityList}</div>;
}
