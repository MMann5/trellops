import React from 'react';
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import ron from '../assets/imgs/profiles/ron.png';
export function ModalDetailsMembers() {
    return (
        <div className="task-details-members flex column">
            <h3>Members</h3>
            <div className="members-container flex">
                <div className='profile-page-link'>
                    <img src={david} alt='' />
                </div>
                <div className='profile-page-link'>
                    <img src={michael} alt='' />
                </div>
                <div className='profile-page-link'>
                    <img src={ron} alt='' />
                </div>
            </div>
        </div>
    )
}
