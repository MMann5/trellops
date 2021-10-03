import React from 'react';
import Popover from '@mui/material/Popover';
import david from '../../assets/imgs/profiles/david.jpg';
import michael from '../../assets/imgs/profiles/michael.png';
import ron from '../../assets/imgs/profiles/ron.png';
import { ReactComponent as AddIcon } from '../../assets/imgs/icons/add.svg'

export function TaskMembers({members}) {
    return (
        <div className="members-container flex wrap">
            {members?.map((member,idx)=> {
                return <img src={member.imgUrl} alt="" key={idx} />
            })}
            {/* <img src={michael} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <img src={ron} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <img src={david} style={{ width: '30px', height: '30px', borderRadius: '50%' }} /> */}
            <button className="secondary-btn"><AddIcon /></button>
        </div>
    )
}