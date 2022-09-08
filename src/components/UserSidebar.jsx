import React from 'react'
import Navbar from './UserNavBar';
import SearchBar from './SearchBar';
import RecentChatList from './RecentChatList';

const UserSidebar = () => {
  return (
    <div className='userSidebar'>
      <Navbar />
      <SearchBar />
      <RecentChatList />
    </div>
  )
}

export default UserSidebar;