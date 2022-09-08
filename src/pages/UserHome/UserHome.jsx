import React from 'react'
import UserSidebar from '../../components/UserSidebar';
import UserChatRoom from '../../components/UserChatRoom';
import './UserHome.scss';

export const UserHome = () => {
  return (
    <>
      <div className='logoContainerWrapper'>
        <div className='logoContainer'>
          <span className="logo">Chat Away</span>
        </div>
      </div>

      <div className='userHomeContainerWrapper'>
        <div className='userHomeContainer'>
          <UserSidebar />
          <UserChatRoom />
        </div>
      </div>
    </>
  )
}
