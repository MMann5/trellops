import React from 'react';
import Popover from '@mui/material/Popover';
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import ron from '../assets/imgs/profiles/ron.png';

export function ModalDetailsMembers() {
    return (
        <Popover
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
        >
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
        </Popover>
    )
}
