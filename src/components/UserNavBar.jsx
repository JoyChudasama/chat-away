import React from 'react'
import MuiMenu from './MuiComponents/MuiMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const UserNavBar = () => {

  const options = ['Profile', 'LogOut'];

  return (
    <div className='userNavBar'>

      <div className='userInfo'>
        <Avatar className='loggedInUserAvatar' alt="Profile Picture" src={tempAvatar} />
        <span className='loggedInUserName'>Temp User</span>
      </div>

      <MuiMenu className='userActions' options={options} />
    </div>
  )
}

export default UserNavBar;