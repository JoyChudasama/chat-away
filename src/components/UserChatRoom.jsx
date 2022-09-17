import React, { useContext } from 'react'
import ChatRoomNavBar from './ChatRoomNavBar';
import ChatRoomMessages from './ChatRoomMessages';
import UserChatInput from './UserChatInput';
import { ChatContext } from '../context/ChatContext';
import { isEmpty } from '@firebase/util';

const UserChatRoom = () => {

  const { data } = useContext(ChatContext);

  return (
    <>
      {
        !isEmpty(data.user) &&
        <div className='userChatRoom'>

          <ChatRoomNavBar />
          <ChatRoomMessages />
          <UserChatInput />
        </div>
      }
    </>
  )
}

export default UserChatRoom;