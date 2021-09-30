import React, { Component } from 'react';

import { FileAttachment } from './FileAttachment';
import { MemberPick } from './MemberPick';
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
    }
    document.body.classList.toggle('popover-open');
  };
  render() {
    const {
      isCheckOpen,
      isDateOpen,
      isFileOpen,
      isPaleteOpen,
      isMemberOpen
    } = this.state;
    return (
      <div className='task-nav'>
        <div className='options' onClick={() => this.toggleOption('isMemberOpen')}>
          <FontAwesomeIcon icon={faUser} className='margin-5' />{' '}
          <span>Members</span>
        </div>
        <Box display={isMemberOpen ? 'block' : 'none'}>
          <MemberPick
            setColor={this.props.setColor}
            closePopup={this.toggleOption}
          />
        </Box>
        <div className='options'>
          <FontAwesomeIcon icon={faTag} className='margin-5' />{' '}
          Labels
        </div>
        <div
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
