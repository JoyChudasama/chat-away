import React, { useContext } from 'react'
import ChatRoomNavMenu from './MuiComponents/ChatRoomNavMenu';
import Avatar from '@mui/material/Avatar';
import { ChatContext } from '../context/ChatContext';

const ChatRoomNavBar = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className='chatRoomNavBar'>

            <div className='senderInfo'>
                <Avatar className='senderAvatar' alt="Profile Picture" src={data.user.photoURL && data.user.photoURL} />
                <span className='senderUserName'>{data.user.userName}</span>
            </div>

            <ChatRoomNavMenu />
        </div>
    )
}

export default ChatRoomNavBar;