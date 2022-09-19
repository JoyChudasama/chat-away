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
import { showConfirmationModal, showProfileModal, showToast } from '../../utils/SweetAlert';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseDatabase } from '../../firebase';
import { SearchChat } from '../../context/SearchChat';
import { AuthContext } from '../../context/AuthContext';


export default function ChatRoomNavMenu(props) {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { data } = useContext(ChatContext);
    const { dispatch } = useContext(SearchChat);
    const { currentUser, user } = useContext(AuthContext);

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null) };


    const showUserProfile = async () => {
        handleClose();
        showProfileModal({ userName: data.user.userName, photoURL: data.user.photoURL, email: data.user.email });
    }

    const clearChat = async () => {
        handleClose();

        try {
            const result = await showConfirmationModal({ title: 'Are you sure you want to clear chat?', text: 'Clearing/Deleting chat will result in permenant loss of messages and media file. Would you like to continue?' })

            if (result.isConfirmed) {
                await setDoc(doc(firebaseDatabase, 'chats', data.chatId), { messages: [] });
                showToast({
                    title: 'Chat cleared succesfully',
                    position: 'top-end',
                    icon: 'success',
                    timer: 2000,
                    isShowTimeProgressBar: 'success',
                    isShowConfirmButton: false,
                    customClass: 'sweetalert sweetalertToast'
                });
            }

        } catch (e) {
            showToast({
                title: 'Oops..Something went wrong',
                position: 'top-end',
                icon: 'error',
                timer: 2000,
                isShowTimeProgressBar: 'error',
                isShowConfirmButton: false,
                customClass: 'sweetalert sweetalertToast'
            });
        }
    }

    const searchChat = async () => {
        handleClose();
        dispatch({ type: "LET_USER_SEARCH" });
    }

    const blockUser = async () => {
        handleClose();

        const currentChatUserUid = data.user.uid;

        await updateDoc(doc(firebaseDatabase, 'users', currentUser.uid), {
            hasBlocked: arrayUnion(currentChatUserUid)
        });
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
