import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onDeleteBoard } from '../store/actions/boards-actions.js';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WarningIcon from '@mui/icons-material/Warning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronLeft,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import night from '../assets/imgs/backgrounds/night.png';
import house from '../assets/imgs/backgrounds/house.png';
import malibu from '../assets/imgs/backgrounds/malibu.jpg';
import island from '../assets/imgs/backgrounds/island.jpg';
import bunny from '../assets/imgs/backgrounds/bunny.jpg';
import manupside from '../assets/imgs/backgrounds/manupside.jpg';
import beach from '../assets/imgs/backgrounds/beach.jpg';
import { ActivityList } from './ActivityList';
import { useHistory } from 'react-router-dom';


export function RightMenu({ setBgColor, board }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openedList, setOpenedList] = React.useState('menuList');
  const dispatch = useDispatch();
  let history = useHistory();

  const onRemoveBoard = () => {
    dispatch(onDeleteBoard(board._id));
    history.push('/workspace');
  };

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
    setOpenedList(currList);
  };

  const menuList = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 339,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        {[
          { listName: 'list', title: 'Change background color', object:<ColorLensIcon  color="primary"/> },
          { listName: 'imgList', title: 'Change background image', object: <ImageIcon  color="primary"
          />},
          {
            listName: 'dangerZone',
            title: 'Delete Board',
            object: <WarningIcon color="success"
            />
          },
        ].map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={(ev) => {
              // ev.preventDefault()
              changeList(text.listName);
            }}
          >
            <div className='flex align-center'>
              <div>
               {text.object}
              </div>
              <div
                className='nav-txt'
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'rgba(0, 0, 0, 0.87)',
                  lineHeight: '20px',
                  marginLeft: '20px',
                }}
              >
                {text.title}
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 339,
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
          '#820263',
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              setBgColor(text);
            }}
          >
            <ListItemText
              style={{
                backgroundColor: text,
                height: '80px',
                padding: '10px 10px',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const imgList = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 339,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[night, house, malibu, island, bunny, beach, manupside].map(
          (text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                setBgColor(text);
              }}
              style={{ margin: '5px 0' }}
            >
              <ListItemText
                style={{
                  backgroundImage: `url(${text})`,
                  width: '177',
                  height: '96px',
                  padding: '10px 10px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  const dangerZone = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom' ? 'auto' : 339,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Delete Board'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={onRemoveBoard}
            style={{ margin: '5px 0' }}
          >
            <ListItemText
              style={{
                width: '177',
                height: 'auto',
                padding: '10px 10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            Delete This Board
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='rigth-menu'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          ></Drawer>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{
              textTransform: 'none',
              fontSize: '1.2rem',
              fontFamily:
                "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: '700',
              fontSize: '16px',
            }}
          >
            Show menu
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className='nav-option-header flex justify-center'>
              {openedList !== 'menuList' && (
                <button
                  className='clean-btn left-btn'
                  onClick={() => {
                    setOpenedList('menuList');
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className='close-x'
                  />
                </button>
              )}
              <h3>Menu</h3>
              <button
                className='clean-btn right-btn'
                onClick={toggleDrawer(anchor, false)}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className='close-x'
                />
              </button>
            </div>
            {openedList === 'menuList' && menuList(anchor)}
            {openedList === 'list' && list(anchor)}
            {openedList === 'imgList' && imgList(anchor)}
            {openedList === 'dangerZone' && dangerZone(anchor)}
            {openedList === 'menuList' && <ActivityList board={board} />}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
