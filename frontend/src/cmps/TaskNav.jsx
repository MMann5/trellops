import React, { Component } from 'react';
<<<<<<< HEAD
=======

import { FileAttachment } from './FileAttachment';
import { MemberPick } from './MemberPick';
import { LabelPick } from './LabelPick';
>>>>>>> e40e53c7a341d52ea1455f2c1315488d59bd633d
import { Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faPaperclip,
  faPalette,
  faClock,
  faTag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { FileAttachment } from './FileAttachment';
import { MemberPick } from './MemberPick';
import { ColorPick } from './ColorPick';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';

export class TaskNav extends Component {
  state = {
    isCheckOpen: false,
    isDateOpen: false,
    isFileOpen: false,
    isPaleteOpen: false,
    isMemberOpen: false,
    isLabelOpen: false,
  };
  toggleOption = (stateOption) => {
    if (stateOption === 'isCheckOpen') {
      this.setState({ isCheckOpen: !this.state.isCheckOpen });
    } else if (stateOption === 'isDateOpen') {
      this.setState({ isDateOpen: !this.state.isDateOpen });
    } else if (stateOption === 'isFileOpen') {
      this.setState({ isFileOpen: !this.state.isFileOpen });
    } else if (stateOption === 'isPaleteOpen') {
      this.setState({ isPaleteOpen: !this.state.isPaleteOpen });
    } else if (stateOption === 'isMemberOpen') {
      this.setState({ isMemberOpen: !this.state.isMemberOpen });
    } else if (stateOption === 'isLabelOpen') {
      this.setState({ isLabelOpen: !this.state.isLabelOpen });
    }
    document.body.classList.toggle('popover-open');
  };

  render() {
    const {
      isCheckOpen,
      isDateOpen,
      isFileOpen,
      isPaleteOpen,
      isMemberOpen,
      isLabelOpen
    } = this.state;
    return (
      <div className='task-nav'>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options' onClick={() => this.toggleOption('isMemberOpen')}>
          <FontAwesomeIcon icon={faUser} className='margin-5' />{' '}
          <span>Members</span>
        </div>
        <Box display={isMemberOpen ? 'block' : 'none'}>
          <MemberPick closePopup={this.toggleOption} />
        </Box>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options'>
          <FontAwesomeIcon icon={faTag} className='margin-5' />{' '}
          Labels
        </div>
        <Box display={isLabelOpen ? 'block' : 'none'}>
          <LabelPick closePopup={this.toggleOption} />
        </Box>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options'
          onClick={() => this.toggleOption('isCheckOpen')}
        >
          <FontAwesomeIcon
            icon={faCheckSquare}
            className='margin-5'
          />
          CheckList
        </div>
        <Box display={isCheckOpen ? 'block' : 'none'}>
          <Checklist closePopup={this.toggleOption} />
        </Box>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options'
          onClick={() => this.toggleOption('isDateOpen')}
        >
          <FontAwesomeIcon icon={faClock} className='margin-5' />{' '}
          Dates
        </div>
        <Box display={isDateOpen ? 'block' : 'none'}>
          <DatePick closePopup={this.toggleOption} />
        </Box>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options'
          onClick={() => this.toggleOption('isFileOpen')}
        >
          <FontAwesomeIcon icon={faPaperclip} className='margin-5' />
          Attachment
        </div>
        <Box display={isFileOpen ? 'block' : 'none'}>
          <FileAttachment closePopup={this.toggleOption} />
        </Box>
        <div
          style={{ justifyContent: 'flex-start', paddingLeft: '30px', textTransform: 'capitalize' }}
          className='options'
          onClick={() => this.toggleOption('isPaleteOpen')}
        >
          <FontAwesomeIcon icon={faPalette} className='margin-5' />
          Color
        </div>
        <Box display={isPaleteOpen ? 'block' : 'none'}>
          {/* <input type='color' onChange={(ev) => this.props.setColor(ev.target.value)}/> */}
          <ColorPick
            setColor={this.props.setColor}
            closePopup={this.toggleOption}
          />
        </Box>
      </div>
    );
  }
}
