import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import ron from '../assets/imgs/profiles/ron.png';
export class MemberPick extends Component {
    render() {
        return (
            <div className="member-pick">
                <div className="nav-option-header flex justify-center">
                    <h3>Members</h3>
                    <button className="clean-btn" onClick={() => { this.props.closePopup('isMemberOpen') }}>
                        <FontAwesomeIcon icon={faTimes} className="close-x" />
                    </button>
                </div>
                <div className="member-container">
                    <h4>Board Members</h4>
                    <ul className="member-list clean-list">
                        <li className='profile-container flex align-center'>
                            <img src={david} alt='' />
                            <span>David Ben Ishai</span>
                        </li>
                        <li className='profile-container flex align-center'>
                            <img src={michael} alt='' />
                            <span>Michael Mann</span>
                        </li>
                        <li className='profile-container flex align-center'>
                            <img src={ron} alt='' />
                            <span>Ron Shmuel Kotigaro</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}