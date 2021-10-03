import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
export function LabelChange({ props, setCurrPopover }) {
    const [stateVal, createStateVal] = React.useState('');
      return (
        <div className='color-pick'>
          <div className='nav-option-header flex justify-center'>
            <h3>Change Label</h3>
            <button
              className='clean-btn'
              onClick={() => {
                setCurrPopover(null);
              }}
            >
              <FontAwesomeIcon icon={faTimes} className='close-x' />
            </button>
          </div>
          <TextField
                fullWidth
                size='small'
                margin='normal'
                variant='outlined'
                placeholder='Search labels...'
                onChange={(ev) => createStateVal(ev.target.value)}
                value={stateVal ? stateVal : ''}
            />
          <div className='colors'>
            <div
              className='color-container green'
              onClick={() => this.props.setColor('#7BC86C')}
            ></div>
            <div
              className='color-container yellow'
              onClick={() => this.props.setColor('#F5DD29')}
            ></div>
            <div
              className='color-container orange'
              onClick={() => this.props.setColor('#FFAF3F')}
            ></div>
            <div
              className='color-container red'
              onClick={() => this.props.setColor('#EF7564')}
            ></div>
            <div
              className='color-container purple'
              onClick={() => this.props.setColor('#CD8DE5')}
            ></div>
            <div
              className='color-container blue'
              onClick={() => this.props.setColor('#5BA4CF')}
            ></div>
            <div
              className='color-container light-blue'
              onClick={() => this.props.setColor('#29CCE5')}
            ></div>
            <div
              className='color-container light-green'
              onClick={() => this.props.setColor('#6DECA9')}
            ></div>
            <div
              className='color-container pink'
              onClick={() => this.props.setColor('#FF8ED4')}
            ></div>
            <div
              className='color-container dark-blue'
              onClick={() => this.props.setColor('#172B4D')}
            ></div>
          </div>
        </div>
      );
  }
  