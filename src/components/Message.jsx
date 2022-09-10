import React from 'react'
import tempAvatar from '../img/avatar.jpg';

const Message = () => {
  return (
    <>
      <div className='message owner'>
        <div className="messageContent">
          <span className='messageText'>Hello Hello Hello</span>
          <img src={tempAvatar} alt="Sent Image" />
          <span className="messageTime">7:35 pm</span>
        </div>
      </div>

      <div className='message'>
        <div className="messageContent">
          <span className='messageText'>Hi Wassup</span>
          <span className="messageTime">Just now</span>
        </div>
      </div>
    </>

  )
}

export default Message;