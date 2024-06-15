import HomeIcon from '@mui/icons-material/Home';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

const ADMIN_ROUTES = [{ url: '/dashboard', name: 'Home', icon: <HomeIcon /> }, { url: '/dashboard/products', name: 'Products', icon: <Inventory2RoundedIcon /> }, {
    url: '/dashboard/add-product', name: 'Add Product', icon: <AddCircleOutlineRoundedIcon />
}, {
    url: '/dashboard/orders', name: 'Orders', icon: <MonetizationOnRoundedIcon />
}];

const USER_ROUTES = [{ url: '/dashboard', name: 'Home', icon: <HomeIcon /> }, { url: '/dashboard/my-orders', name: 'My Orders', icon: <StoreRoundedIcon /> }];

export {
    ADMIN_ROUTES,
    USER_ROUTES
};