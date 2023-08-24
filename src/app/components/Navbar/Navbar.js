import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectMetaMask from '../../components/ConnectMetamask/ConnectMetamask';
import Button from '@mui/material/Button';

const Navbar = () => {
  let [data, setData] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChildData = (childData) => {
    setData(childData);
    debugger
    localStorage.setItem('user_id', data);
  };

  return (
    <nav className='navbar-items'>
      {!data ? <h1 className='navbar-logo' style={ {marginBottom: '25px'}}>Intermediary</h1> : <h1 className='navbar-logo'>Intermediary</h1> }

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
        {!data ? (
          <li>
            <Link to='/dashboard'>
              {/* Render the button instead of plain text */}
              {data !== 'null' ? (
                <Button variant="contained" color="primary">
                  Back to dashboard
                </Button>
              ) : (
                'Connect MetaMask'
              )}
            </Link>
          </li>
        ) : <li>
          <Link to='/dashboard'>
            <ConnectMetaMask sendData={handleChildData} />
          </Link>
        </li>}
      </ul>
    </nav>
  );
};

export default Navbar;