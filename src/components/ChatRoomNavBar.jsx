import React from 'react'
import MuiChatRoomNavMenu from './MuiComponents/MuiChatRoomNavMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const ChatRoomNavBar = () => {

    return (
        <div className='chatRoomNavBar'>

            <div className='senderInfo'>
                <Avatar className='senderAvatar' alt="Profile Picture" src={tempAvatar} />
                <span className='senderUserName'>Sender Name</span>
            </div>

            <MuiChatRoomNavMenu />
        </div>
    )
}

export default ChatRoomNavBar;