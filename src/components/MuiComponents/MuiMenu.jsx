import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

export default function MuiMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    return (
        <div>
            <IconButton
                aria-label="menuButton"
                id="menuButton"
                aria-controls={open ? 'menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                disableTouchRipple={true}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu id="menu" MenuListProps={{ 'aria-labelledby': 'menu' }} anchorEl={anchorEl} open={open} onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {
                    props.options.map((option) => (
                        <MenuItem key={option} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))
                }

            </Menu>
        </div>
    );
}
