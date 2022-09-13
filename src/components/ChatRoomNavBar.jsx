import React from 'react'
import ChatRoomNavMenu from './MuiComponents/ChatRoomNavMenu';
import Avatar from '@mui/material/Avatar';
import defaultAvatar from '../img/default/defaultAvatar1.png';

const ChatRoomNavBar = () => {

    return (
        <div className='chatRoomNavBar'>

            <div className='senderInfo'>
                <Avatar className='senderAvatar' alt="Profile Picture" src={defaultAvatar} />
                <span className='senderUserName'>Sender Name</span>
            </div>

            <ChatRoomNavMenu />
        </div>
    )
}

export default ChatRoomNavBar;