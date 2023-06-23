import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NavbarInfo.css';


const NavBarInfo = ({ money }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    const [balance, setBalance] = useState(() => localStorage.getItem('balance'));
    const [user, setUser] = useState(() => localStorage.getItem('user_id'));
    return (
        <div className='navbar-info-container'>
            <nav className='navbar-info'>
                <h1 className='navbar-info-logo'>
                    <span className='navbar-logo-text'>Account: {user}</span>
                    <span className='navbar-logo-text'>Balance: {balance}</span>
                    <FontAwesomeIcon className='navbar-info-alert' icon={faBell} />
                </h1>
            </nav>
        </div>
    );
};

export default NavBarInfo;