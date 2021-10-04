import React from 'react';
import David from '../../assets/imgs/profiles/david.jpg';
import Michael from '../../assets/imgs/profiles/michael.png';
import Ron from '../../assets/imgs/profiles/ron.png';
import Tal from '../../assets/imgs/profiles/tal.jpg';
import { ReactComponent as AddIcon } from '../../assets/imgs/icons/add.svg';

const avatars = {
  Ron,
  David,
  Michael,
  Tal,
};
export function TaskMembers({ members }) {
  return (
    <div className='members-container flex wrap'>
      {members.map((member, idx) => {
        return (
          <img
            src={avatars[member.fullname.split(' ')[0]]}
            alt=''
            key={idx}
          />
        );
      })}
    </div>
  );
}
