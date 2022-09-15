import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { signOut } from "firebase/auth";
import { firebaseAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';

export default function UserNavMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

    const handleMenuClick = (event) => { setAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) };

    const handleLogout = () => {
        signOut(firebaseAuth);
        navigate('/login');
        dispatch({ type: "RESET" });
    };

    return (
        <div>
            <IconButton
                aria-label="menuButton"
                id="menuButton"
                aria-controls={open ? 'menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                disableTouchRipple={true}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu id="menu" MenuListProps={{ 'aria-labelledby': 'menu' }} anchorEl={anchorEl} open={open} onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >

                <Link to='/user-account'>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon />
                        </ListItemIcon>
                        Account
                    </MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </div >
    );
}
