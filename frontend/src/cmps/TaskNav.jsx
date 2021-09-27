import React, { Component } from 'react';
import labelIcon from '../assets/imgs/icons/label.png';
import membersIcon from '../assets/imgs/icons/members.svg';
import dateIcon from '../assets/imgs/icons/date.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
export class TaskNav extends Component {
  render() {
    return (
      <div className='task-nav'>
        <button>
          <img src={membersIcon} alt='' />
          Members
        </button>
        <button>
          <img src={labelIcon} alt='' />
          Labels
        </button>
        <button>
          <FontAwesomeIcon icon={faCheckSquare} />
          CheckList
        </button>
        <button>
          <img src={dateIcon} alt='' />
          Dates
        </button>
        <FontAwesomeIcon icon={faPaperclip} />
        <button>Attachment</button>
      </div>
    );
  }
}
