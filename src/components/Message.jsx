import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { convertFirebaseTimestampToHoursAndMinuteForMessage } from '../utils/DateUtils';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messageTime = convertFirebaseTimestampToHoursAndMinuteForMessage(message.date)

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    const objDiv = document.getElementById("chatRoomMessages");
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
  }

  return (
    <>
      <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
        <div className="messageContent">
          {message.text && <span className='messageText'>{message.text}</span>}
          {message.img && <img src={message.img} alt="deleted image" />}
          <span className="messageTime">{messageTime}</span>
        </div>
      </div>
    </>

  )
}

export default Message;