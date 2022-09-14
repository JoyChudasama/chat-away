import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  useEffect(() => {
    //Keeps scrollbar at the bottom
    const objDiv = document.getElementById("chatRoomMessages");
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;

  }, [message]);

  return (
    <>
      <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
        <div className="messageContent">
          {message.text && <span className='messageText'>{message.text}</span>}
          {message.img && <img src={message.img} alt="Sent Image" />}
          <span className="messageTime">just now</span>
        </div>
      </div>
    </>

  )
}

export default Message;