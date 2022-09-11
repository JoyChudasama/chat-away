import React from 'react'
import UserNavMenu from './MuiComponents/UserNavMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const UserNavBar = () => {

  return (
    <div className='userNavBar'>

      <div className='userInfo'>
        <Avatar className='loggedInUserAvatar' alt="Profile Picture" src={tempAvatar} />
        <span className='loggedInUserName'>Temp User</span>
      </div>

      <UserNavMenu />
    </div>
  )
}

export default UserNavBar;