import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messageTime = new Date(message.date.seconds * 1000).toLocaleTimeString('default', {hour: '2-digit', minute:'2-digit'});

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
          <span className="messageTime">{messageTime}</span>
        </div>
      </div>
    </>

  )
}

export default Message;