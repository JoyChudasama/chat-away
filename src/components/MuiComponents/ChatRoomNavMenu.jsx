import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useContext } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import { ChatContext } from '../../context/ChatContext';
import { showProfileModal, showToast, showWarningModal } from '../../utils/SweetAlert';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { fireabaseDatabase } from '../../firebase';
import Swal from 'sweetalert2';


export default function ChatRoomNavMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { data } = useContext(ChatContext);

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null) };


    const showUserProfile = () => {
        handleClose();
        showProfileModal({ userName: data.user.userName, photoURL: data.user.photoURL, email: data.user.email });
    }

    const searchChat = () => {
        handleClose();

    }

    const clearChat = async () => {
        handleClose();

        try {

            Swal.fire({
                title: 'Are you sure you want to clear chat ?',
                text: 'Clearing/Deleting chat will result in permenant loss of messages and media file. Would you like to continue? ',
                showCloseButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showLoaderOnConfirm: true,
                confirmButtonColor: '#d33',
                customClass: 'sweetalert'
            }).then((result) => {
                if (result.isConfirmed) {
                    setDoc(doc(fireabaseDatabase, 'chats', data.chatId), { messages: [] }).then(() => {
                        showToast({
                            title: 'Chat cleared succesfully',
                            position: 'top-end',
                            icon: 'success',
                            timer: 2000,
                            isShowTimeProgressBar: 'success',
                            isShowConfirmButton: false,
                            customClass: 'sweetalert sweetalertToast'
                        });
                    });
                }
            })


        } catch (e) {
            console.log(e)
        }
    }

    const blockUser = () => {
        handleClose();

    }

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
                <MenuItem onClick={showUserProfile}>
                    <ListItemIcon>
                        <AccountCircleRoundedIcon />
                    </ListItemIcon>
                    View Profile
                </MenuItem>

                <MenuItem onClick={searchChat}>
                    <ListItemIcon>
                        <ManageSearchRoundedIcon />
                    </ListItemIcon>
                    Search Chat
                </MenuItem>

                <MenuItem onClick={clearChat}>
                    <ListItemIcon>
                        <BackspaceRoundedIcon />
                    </ListItemIcon>
                    Clear Chat
                </MenuItem>

                <MenuItem onClick={blockUser}>
                    <ListItemIcon>
                        <BlockRoundedIcon />
                    </ListItemIcon>
                    Block User
                </MenuItem>

            </Menu>
        </div>
    );
}
