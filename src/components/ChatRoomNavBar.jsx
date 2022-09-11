import React from 'react'
import ChatRoomNavMenu from './MuiComponents/ChatRoomNavMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const ChatRoomNavBar = () => {

    return (
        <div className='chatRoomNavBar'>

            <div className='senderInfo'>
                <Avatar className='senderAvatar' alt="Profile Picture" src={tempAvatar} />
                <span className='senderUserName'>Sender Name</span>
            </div>

            <ChatRoomNavMenu />
        </div>
    )
}

export default ChatRoomNavBar;