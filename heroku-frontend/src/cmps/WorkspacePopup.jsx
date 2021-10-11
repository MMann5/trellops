import React, { useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import night from '../assets/imgs/backgrounds/night.png';
import house from '../assets/imgs/backgrounds/house.png';
import malibu from '../assets/imgs/backgrounds/malibu.jpg';
import island from '../assets/imgs/backgrounds/island.jpg';
import bunny from '../assets/imgs/backgrounds/bunny.jpg';
import manupside from '../assets/imgs/backgrounds/manupside.jpg';
import beach from '../assets/imgs/backgrounds/beach.jpg';
import balcony from '../assets/imgs/backgrounds/balcony.jpg';
import home from '../assets/imgs/backgrounds/home.jpg';


export function WorkspacePopup({
  setBoardName,
  onAddEmptyBoard,
  boardName,
  onClosePopup,
  setBoardBackground,
  boardBackground,
}) {
  const imgList = [
    bunny,
    night,
    house,
    malibu,
    island,
    beach,
    manupside,
    balcony,
    home,
  ];
  const [exampleBackground, setexampleBackground] = useState(bunny);
  const onSetBackground = (background) => {
    setexampleBackground(background);
    setBoardBackground(background);
  };
  const inputProps = {
    fontWeight: 500,
    disableUnderline: true,
    color: 'white',
  };

  return (
    <div className='work-space-popup'>
      <div className='work-space-main flex'>
        <div
          className='new-board-example'
          style={{
            backgroundImage: `url(${exampleBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '5px',
          }}
        >
          <div className='new-board-content flex align-center'>
            <form
              onSubmit={() => {
                onAddEmptyBoard(boardName, boardBackground);
                onClosePopup();
              }}
            >
              <input
                placeholder='Add board title'
                type='text'
                onChange={(ev) => setBoardName(ev.target.value)}
                value={boardName}
              />
            </form>
            <button className='clean-btn' onClick={onClosePopup}>
              <CloseRoundedIcon
                style={{
                  color: 'rgb(255, 255, 255)',
                  marginLeft: '9px',
                }}
              />
            </button>
          </div>
        </div>
        <div className='colors'>
          {imgList.map((text) => (
            <div
              key={text}
              className='color-container green'
              style={{
                backgroundImage: `url(${text})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => onSetBackground(text)}
            ></div>
          ))}
        </div>
      </div>
      <button
        className='add-board-btn'
        onClick={() => {
          onAddEmptyBoard(boardName, boardBackground);
          onClosePopup();
        }}
      >
        Create board
      </button>
    </div>
  );
}
