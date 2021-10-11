import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/‏‏homelogo2.svg';
import ron from '../assets/imgs/profiles/ron.png';
import homeIcon from '../assets/imgs/icons/home.svg';


export class BoardsNavBar extends Component {
  render() {
    return (
      <div className='boards-nav-bar flex justify-space-between'>
        <div className='left-boards-nav flex'>
          <div className='home-icon'>
            <Link to='/'>
              <img src={homeIcon} alt='' />
            </Link>
          </div>
          <Link to='/workspace'>
            <h3>Boards</h3>
          </Link>
        </div>
        <div className='logo'>
          <img src={logo} alt='' />
          <Link to='/'>
            <h3>Trellops</h3>
          </Link>
        </div>
        <div className='profile-page-link'>
          <img src={ron} alt='' />
        </div>
      </div>
    );
  }
}
