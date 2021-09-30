import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { color } from '@mui/system';

export function RightMenu({setBGColorFunc}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['green', 'yellow', 'orange', 'red'].map(
          (text, index) => (
            <ListItem button key={text} onClick={()=>{
              setBGCFunc(text)
            }
            }>
              {/* <ListItemIcon>sid
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  function setBGCFunc(bgColor){
    setBGColorFunc(bgColor)
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={
            toggleDrawer(anchor, true)
          }
          style={{textTransform:'none', fontSize: '1.2rem', fontFamily:'\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif', fontWeight:'700', fontSize:'16px'}}>
            Show Menu
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
