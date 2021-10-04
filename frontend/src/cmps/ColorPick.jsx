import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function ColorPick({ props, setCurrPopover, sendTask }) {
  const setColor = (color) => {
    sendTask(false, { ...props, bgColor: color });
  };

  return (
    <div className='color-pick'>
      <div className='nav-option-header flex justify-center'>
        <h3>Choose a color</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className='close-x' />
        </button>
      </div>
      <div className='colors'>
        <div
          className='color-container green'
          onClick={() => setColor('#7BC86C')}
        ></div>
        <div
          className='color-container yellow'
          onClick={() => setColor('#F5DD29')}
        ></div>
        <div
          className='color-container orange'
          onClick={() => setColor('#FFAF3F')}
        ></div>
        <div
          className='color-container red'
          onClick={() => setColor('#EF7564')}
        ></div>
        <div
          className='color-container purple'
          onClick={() => setColor('#CD8DE5')}
        ></div>
        <div
          className='color-container blue'
          onClick={() => setColor('#5BA4CF')}
        ></div>
        <div
          className='color-container light-blue'
          onClick={() => setColor('#29CCE5')}
        ></div>
        <div
          className='color-container light-green'
          onClick={() => setColor('#6DECA9')}
        ></div>
        <div
          className='color-container pink'
          onClick={() => setColor('#FF8ED4')}
        ></div>
        <div
          className='color-container dark-blue'
          onClick={() => setColor('#172B4D')}
        ></div>
      </div>
    </div>
  );
}
