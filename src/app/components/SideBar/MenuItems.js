import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
export const MenuItems = [
    {
        key: 1,
        text: "Create Offer",
        icon: faMoneyBill,
        iconStyle: "icon-style",
        path: "/new-offer"
    },
    {
        key: 2,
        text: "List Offers",
        icon: faList,
        iconStyle: "icon-style",
        path: "/list-offers"
    },
    {
        key: 3,
        text: "In progress",
        icon: faBarsProgress,
        iconStyle: "icon-style",
        path: "/list-reoffers"
    },
    {
        key: 4,
        text: "Offers history",
        icon: faDatabase,
        iconStyle: "icon-style",
        path: "/historical"
    },
    {
        key: 5,
        text: "Settings",
        icon: faGear,
        iconStyle: "icon-style",
        path: "/settings"
    }
];