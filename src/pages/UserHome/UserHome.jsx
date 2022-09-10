import React from 'react'
import UserSidebar from '../../components/UserSidebar';
import UserChatRoom from '../../components/UserChatRoom';
import './UserHome.scss';
import Logo from '../../components/Logo/Logo';

const UserHome = () => {
  return (
    <>
      <Logo />
      <div className='userHomeContainerWrapper'>
        <div className='userHomeContainer'>
          <UserSidebar />
          <UserChatRoom />
        </div>
      </div>
    </>
  )
}


export default UserHome;