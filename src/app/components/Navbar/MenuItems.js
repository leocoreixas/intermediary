import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export const MenuItems = [
  {
    title: 'Home',
    cName: 'nav-links',
    path: '/',
    icon: faHome,
    iconNavbar: 'icons-navbar',
  },
  {
    title: 'About Us',
    cName: 'nav-links',
    path: '/info',
    icon: faCircleInfo,
    iconNavbar: 'icons-navbar',
  },
  {
    title: 'Contact Us',
    cName: 'nav-links',
    path: '/contact',
    icon: faMessage,
    iconNavbar: 'icons-navbar',
  },
  {
    title: 'Sign Up',
    cName: 'nav-links-mobile',
    path: '/connect',
    icon: faMessage,
  },
];