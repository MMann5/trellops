import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { color } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faSquare } from '@fortawesome/free-solid-svg-icons';
import night from '../assets/imgs/backgrounds/night.png';
import sky from '../assets/imgs/backgrounds/backgrounds.jpg';
import house from '../assets/imgs/backgrounds/house.png';
import malibu from '../assets/imgs/backgrounds/malibu.jpg';
import island from '../assets/imgs/backgrounds/island.jpg';
import bunny from '../assets/imgs/backgrounds/bunny.jpg';
import manupside from '../assets/imgs/backgrounds/manupside.jpg';
import beach from '../assets/imgs/backgrounds/beach.jpg';
import { ActivityList } from './ActivityList';

export function RightMenu({ setBgColor, board }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openedList, setOpenedList] = React.useState('MenuList')

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const changeList = (currList) => {
    setOpenedList(currList)
  }

  const MenuList = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 200,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        {[{ listName: 'list', title: 'Change background color' }, { listName: 'imgList', title: 'Change background image' }
        ].map(
          (text, index) => (
            <ListItem button key={index} onClick={(ev) => {
              // ev.preventDefault()
              changeList(text.listName)
            }}>
              <div className="flex align-center">
                <div>
                  <FontAwesomeIcon icon={faSquare} style={{color:"rgb(0, 121, 191)"}}/>
                </div>
                <div className="nav-txt" style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(0, 0, 0, 0.87)",
                  lineHeight: "20px",
                  marginLeft: "16px"
                }}>
                  {text.title}
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

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 200,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          '#60bd4f',
          '#f2d600',
          '#ff9e1a',
          '#eb5a46',
          '#c277e0',
          '#0279bf',
          '#52e898',
          '#ff78cb',
          '#334563',
          '#b3bac5',
          '#D90368',
          '#820263'

        ].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => {
              setBgColor(text)
            }
            }>
              <ListItemText style={{ backgroundColor: text, height: '50px' }} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const imgList = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 200,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[night, house, malibu, island, bunny, beach, manupside
        ].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => {
              setBgColor(text)
            }}>
              <ListItemText style={{ backgroundImage: `url(${text})`, height: '50px', backgroundSize:'cover', backgroundPosition: 'center'}} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div className="rigth-menu">
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >

          </Drawer>
          <Button onClick={
            toggleDrawer(anchor, true)
          }
            style={{ textTransform: 'none', fontSize: '1.2rem', fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif', fontWeight: '700', fontSize: '16px' }}>
            Show Menu
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="nav-option-header flex justify-center">
              {(openedList !== 'MenuList') && <button className="clean-btn left-btn" onClick={() => { setOpenedList('MenuList') }}>
                <FontAwesomeIcon icon={faChevronLeft} className="close-x" />
              </button>}
              <h3>Menu</h3>
              <button className="clean-btn right-btn" onClick={toggleDrawer(anchor, false)}>
                <FontAwesomeIcon icon={faTimes} className="close-x" />
              </button>
            </div>
            {(openedList === 'MenuList') && MenuList(anchor)}
            {(openedList === 'list') && list(anchor)}
            {(openedList === 'imgList') && imgList(anchor)}
            <ActivityList board={board}/>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
