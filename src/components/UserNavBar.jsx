import React, { useContext } from 'react'
import UserNavMenu from './MuiComponents/UserNavMenu';
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img//default/defaultAvatar3.png';
import { AuthContext } from '../context/AuthContext';

const UserNavBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='userNavBar'>

      <div className='userInfo'>
        <Avatar className='loggedInUserAvatar' alt="Profile Picture" src={tempAvatar} />
        <span className='loggedInUserName'>{currentUser.displayName}</span>
      </div>

      <UserNavMenu />
    </div>
  )
}

export default UserNavBar;