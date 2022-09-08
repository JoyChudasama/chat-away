import React from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const RecentChatList = () => {

  return (
    <div className='recentChatList'>
      
      <div className='recentChatCard'>
        <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={tempAvatar} />
        <div className='recentChat'>
          <span className='recentChatUsername'>Jane</span>
          <p className='recentChatMessage'>Recent chat recent message</p>
        </div>
      </div>

      <div className='recentChatCard'>
        <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={tempAvatar} />
        <div className='recentChat'>
          <span className='recentChatUsername'>Jane</span>
          <p className='recentChatMessage'>Recent chat recent message</p>
        </div>
      </div>

      <div className='recentChatCard'>
        <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={tempAvatar} />
        <div className='recentChat'>
          <span className='recentChatUsername'>Jane</span>
          <p className='recentChatMessage'>Recent chat recent message</p>
        </div>
      </div>

    </div>
  )
}

export default RecentChatList