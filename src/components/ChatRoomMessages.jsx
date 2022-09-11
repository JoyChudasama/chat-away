import React, { useEffect } from 'react'
import Message from './Message'

const ChatRoomMessages = () => {

  useEffect(() => {
  
    //Keeping scrollbar at the bottom
    const objDiv = document.getElementById("chatRoomMessages");
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
  
  }, [])

  return (
    <div className='chatRoomMessages' id="chatRoomMessages">

      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />

      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />

    </div>
  )
}

export default ChatRoomMessages;