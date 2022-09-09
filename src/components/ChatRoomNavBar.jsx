import React from 'react'
import MuiMenu from './MuiComponents/MuiMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const ChatRoomNavBar = () => {

    const options = ['Profile', 'Search Chat', 'Clear Chat', 'Block'];

    return (
        <div className='chatRoomNavBar'>

            <div className='senderInfo'>
                <Avatar className='senderAvatar' alt="Profile Picture" src={tempAvatar} />
                <span className='senderUserName'>Sender Name</span>
            </div>

            <MuiMenu options={options} />
        </div>
    )
}

export default ChatRoomNavBar;