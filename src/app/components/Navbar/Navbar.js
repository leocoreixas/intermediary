import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectMetaMask from '../../components/ConnectMetamask/ConnectMetamask';
import Button from '@mui/material/Button';

const Navbar = () => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  
  const handleChildData = (childData) => {
    setData(childData);
    setConnected(true); 
    localStorage.setItem('user_id', childData);
  };

  const verifyConnection = () => {
    debugger
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts && accounts.length > 0) {
            setData(accounts[0]);
            localStorage.setItem('user_id', accounts[0]);
            setConnected(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error('MetaMask not found');
    }
  };

  useEffect(() => {
    verifyConnection();
  }, []);

  return (
    <nav className='navbar-items'>
      {!data ? <h1 className='navbar-logo' style={{ marginBottom: '25px' }}>Intermediary</h1> : <h1 className='navbar-logo'>Intermediary</h1>}

      <div className='menu-icons'>
        <a onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </a>
      </div>

      <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.path}>
                <span className={item.iconNavbar}>
                  <FontAwesomeIcon icon={item?.icon} />
                </span>
                {item.title}
              </Link>
            </li>
          )
        })}
        {connected && (
          <li>
            <Link to='/dashboard'>
              <Button variant="contained" color="primary">
                Go to dashboard
              </Button>
            </Link>
          </li>
        )}   
        {!connected && (
          <li>
            <ConnectMetaMask sendData={handleChildData} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
