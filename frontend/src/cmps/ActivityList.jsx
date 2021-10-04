import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
export function ActivityList({board}){
    const activities = board.activities
    console.log('activities', activities);
    const MenuList = (anchor) => (
        <Box
          sx={{
            width:
              anchor === 'top' || anchor === 'bottom' ? 'auto' : 200,
          }}
          role='presentation'
        //   onClick={toggleDrawer(anchor, true)}
        //   onKeyDown={toggleDrawer(anchor, true)}
        >
          <List>
            {activities.map(
              (activity, index) => (
                <ListItem button key={index} onClick={(ev) => {
                //   changeList(activity.listName)
                }}>
                  <div className="flex align-center">
                    <div className="nav-txt" style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "rgba(0, 0, 0, 0.87)",
                      lineHeight: "20px",
                      marginLeft: "16px"
                    }}>
                      {activity.byMember.fullname + activity.txt}
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
    return(
        <div className="activity-list">
            {/* {MenuList(anchor)} */}
        </div>
    )
}