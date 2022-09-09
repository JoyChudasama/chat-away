import React from 'react'
import UserNavBar from './UserNavBar';
import SearchBar from './SearchBar';
import RecentChatList from './RecentChatList';

const UserSidebar = () => {
  return (
    <div className='userSidebar'>
      <UserNavBar />
      <SearchBar />
      <RecentChatList />
    </div>
  )
}

export default UserSidebar;