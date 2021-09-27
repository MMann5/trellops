import React, { Component } from 'react';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';
import { FileAttachment } from './FileAttachment';
import { Box } from '@material-ui/core';
import labelIcon from '../assets/imgs/icons/label.png';
import membersIcon from '../assets/imgs/icons/members.svg';
import dateIcon from '../assets/imgs/icons/date.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faPaperclip } from '@fortawesome/free-solid-svg-icons'
export class TaskNav extends Component {
    state = {
        isCheckOpen: false,
        isDateOpen: false,
        isFileOpen: false,
    }
    toggleOption = (stateOption)=>{
        if (stateOption==='isCheckOpen'){
            this.setState({isCheckOpen:!this.state.isCheckOpen})
        } else if(stateOption==='isDateOpen'){
            this.setState({isDateOpen:!this.state.isDateOpen})            
        } else if(stateOption==='isFileOpen'){
            this.setState({isFileOpen:!this.state.isFileOpen})            
        }
        document.body.classList.toggle('popover-open')
    }
    render() {
        const {isCheckOpen, isDateOpen, isFileOpen} = this.state
        return (
            <div className="task-nav">
                <div className="options">
                    <img src={membersIcon} alt="" />
                    Members
                </div>
                <div className="options">
                    <img src={labelIcon} alt="" />
                    Labels
                </div>
                <div className="options" onClick={()=> this.toggleOption('isCheckOpen')}>
                    <FontAwesomeIcon icon={faCheckSquare} className="margin-5" />
                    CheckList
                    <Box display={isCheckOpen? 'block' :'none'}>
                        <Checklist/>
                    </Box>
                </div>
                <div className="options" onClick={()=> this.toggleOption('isDateOpen')}>
                    <img src={dateIcon} alt="" />
                    Dates
                    <Box display={isDateOpen? 'block' :'none'}>
                        <DatePick/>
                    </Box>
                </div>
                <div className="options" onClick={()=> this.toggleOption('isFileOpen')}>
                    <FontAwesomeIcon icon={faPaperclip} className="margin-5" />
                    Attachment
                    <Box display={isFileOpen? 'block' :'none'}>
                        <FileAttachment/>
                    </Box>
                </div>
            </div>
        )
    }
}
