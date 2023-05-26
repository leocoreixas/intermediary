import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NavbarInfo.css';


const NavBarInfo = ({ money }) => {
    return (
        <div className='navbar-info-container'>
            <nav className='navbar-info'>
                <h1 className='navbar-info-logo'>
                    <span className='navbar-logo-text'>Balance: $ 4.00</span>
                    <FontAwesomeIcon className='navbar-info-alert' icon={faBell} />
                </h1>
            </nav>
        </div>
    );
};

export default NavBarInfo;