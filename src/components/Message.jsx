import React from 'react'
import tempAvatar from '../img/avatar.jpg';

const Message = () => {
  return (
    <>
      <div className='messageContainer owner'>
        <div className='message owner'>
          <div className="messageContent">
            <span className='messageText'>Hello</span>
            <br />
            <img src={tempAvatar} alt="Sent Image" />
          </div>
          <div className="messageDetail">
            <span className="messageTime">7:35 pm</span>
          </div>
        </div>
      </div>
      <div className='messageContainer '>
        <div className='message'>
          <div className="messageContent">
            <span className='messageText'>Hi</span>
            <br />
            <span className='messageText'>Wassup</span>
          </div>
          <div className="messageDetail">
            <span className="messageTime">Just now</span>
          </div>
        </div>
      </div>
    </>

  )
}

export default Message;