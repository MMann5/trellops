import logo from '../assets/imgs/‏‏homelogo2.svg';
import david from '../assets/imgs/profiles/david.jpg';
import homeIcon from '../assets/imgs/icons/home.svg';
import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'
export class BoardsNavBar extends Component {
    render() {
        return (
            <div className="boards-nav-bar flex justify-space-between">
                <div className="left-boards-nav flex">
                    <div className="home-icon">
                    <NavLink to="/workspace" >
                        <img src={homeIcon} alt="" />
                    </NavLink> 
                    </div>
                    <h3>Boards</h3>
                </div>
                <div className='logo'>
                        {/* needs to render currUser profile picture path */}
                        <img src={logo} alt='' />
                        <a href='/#'>Trellops</a>
                    </div>
                <div className="profile-page-link">
                    <img src={david} alt="" />
                </div>
            </div>
        )
    }
}