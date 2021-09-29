import React, { Component } from 'react';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';
import { FileAttachment } from './FileAttachment';
import { Box } from '@material-ui/core';
import labelIcon from '../assets/imgs/icons/label.png';
import membersIcon from '../assets/imgs/icons/members.svg';
import dateIcon from '../assets/imgs/icons/date.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faPaperclip, faPalette } from '@fortawesome/free-solid-svg-icons'
import { ColorPick } from './ColorPick';
export class TaskNav extends Component {
    state = {
        isCheckOpen: false,
        isDateOpen: false,
        isFileOpen: false,
        isPaleteOpen: false,
    }
    toggleOption = (stateOption) => {
        if (stateOption === 'isCheckOpen') {
            this.setState({ isCheckOpen: !this.state.isCheckOpen })
        } else if (stateOption === 'isDateOpen') {
            this.setState({ isDateOpen: !this.state.isDateOpen })
        } else if (stateOption === 'isFileOpen') {
            this.setState({ isFileOpen: !this.state.isFileOpen })
        } else if (stateOption === 'isPaleteOpen') {
            this.setState({ isPaleteOpen: !this.state.isPaleteOpen })
        }
        document.body.classList.toggle('popover-open')
    }
    render() {
        const { isCheckOpen, isDateOpen, isFileOpen, isPaleteOpen } = this.state
        return (
            <div className="task-nav">
                {/* <div onClick={() => { this.toggleOption('isCheckOpen') }} className="overlay"></div> */}
                <div className="options">
                    <img src={membersIcon} alt="" />
                    Members
                </div>
                <div className="options">
                    <img src={labelIcon} alt="" />
                    Labels
                </div>
                <div className="options" onClick={() => this.toggleOption('isCheckOpen')}>
                    <FontAwesomeIcon icon={faCheckSquare} className="margin-5" />
                    CheckList
                </div>
                <Box display={isCheckOpen ? 'block' : 'none'}>
                    <Checklist closePopup={this.toggleOption} />
                </Box>
                <div className="options" onClick={() => this.toggleOption('isDateOpen')}>
                    <img src={dateIcon} alt="" />
                    Dates
                </div>
                <Box display={isDateOpen ? 'block' : 'none'}>
                    <DatePick />
                </Box>
                <div className="options" onClick={() => this.toggleOption('isFileOpen')}>
                    <FontAwesomeIcon icon={faPaperclip} className="margin-5" />
                    Attachment
                </div>
                <Box display={isFileOpen ? 'block' : 'none'}>
                    <FileAttachment />
                </Box>
                <div className="options" onClick={() => this.toggleOption('isPaleteOpen')}>
                    <FontAwesomeIcon icon={faPalette} className="margin-5" />
                    Color
                </div>
                <Box display={isPaleteOpen ? 'block' : 'none'}>
                {/* <input type='color' onChange={(ev) => this.props.setColor(ev.target.value)}/> */}
                <ColorPick setColor={this.props.setColor}/>
                </Box>
            </div>
        )
    }
}
