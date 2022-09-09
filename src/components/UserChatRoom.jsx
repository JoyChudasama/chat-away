import React from 'react'
import ChatRoomNavBar from './ChatRoomNavBar';
import ChatRoomMessages from './ChatRoomMessages';
import UserChatInput from './UserChatInput';

const UserChatRoom = () => {
  return (
    <div className='userChatRoom'>
      <ChatRoomNavBar />
      <ChatRoomMessages />
      <UserChatInput />    

    </div>
  )
}

export default UserChatRoom;