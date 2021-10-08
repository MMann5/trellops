import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export function ActivityList({ board }) {
  const activities = board.activities
  console.log('activities', activities);
  const organizeActivity = (activity) => {
    switch (activity) {
      case 'new group':
        return `added a new group to this board`
      case 'new task':
        return `added a new task to this board` //${activity.taskOrGroup.title}
      case 'removed group':
        return `removed a group from this board` //${activity.taskOrGroup.title?}
    }
    return activity;
  }

  const activityList = (
    <Box
      sx={{
        width: 200,
      }}
      role='presentation'>
      <List>
        <h3>Activity</h3>
        {activities.map(
          (activity, index) => (
            <ListItem button key={index} onClick={(ev) => {
            }}>
              <div className="flex align-center">
                {(activity.byMember.imgUrl !== 'http://some-img') && <img
                  src={
                    require(`../assets/imgs/profiles/${activity.byMember.imgUrl}`).default
                  }
                  alt=''
                />}
                <div className="nav-txt flex align-center" style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(0, 0, 0, 0.87)",
                  lineHeight: "20px",
                  marginLeft: "16px"
                }}>
                  <span>{activity.byMember.fullname} {organizeActivity(activity.txt)}</span>
                </div>
              </div>
              <ListItemText style={{
                backgroundColor: '#fff', height: '50px'
              }} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  return (
    <div className="activity-list">
      {activityList}
    </div>
  )
}