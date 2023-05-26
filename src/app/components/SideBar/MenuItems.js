import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
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
        text: "Offers history",
        icon: faListOl,
        iconStyle: "icon-style",
        path: "/historical"
    },
    {
        key: 3,
        text: "Settings",
        icon: faGear,
        iconStyle: "icon-style",
        path: "/settings"
    }
];