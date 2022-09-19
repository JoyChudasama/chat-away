import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { SearchChat } from '../context/SearchChat';
import { convertFirebaseTimestampToHoursAndMinuteForMessage } from '../utils/DateUtils';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { searchChatContext } = useContext(SearchChat);

  const messageTime = convertFirebaseTimestampToHoursAndMinuteForMessage(message.date)

  useEffect(() => {
    scrollToBottom();
  }, [message, data]);

  const scrollToBottom = () => {
    const objDiv = document.getElementById("chatRoomMessages");
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
  }

  return (
    <>
      <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
        <div className="messageContent">

          {
            message.text &&
            <span className={`messageText ${searchChatContext.isRemoveHighlights ? '' :
              searchChatContext.searchTerm !== '' ?
                message.text.toLowerCase().includes(searchChatContext.searchTerm.toLowerCase()) ?
                  'highlight' : '' : ''}`}
            >
              {message.text}
            </span>
          }

          {message.img && <img src={message.img} alt="deleted" />}

          <span className='messageTime' >{messageTime}</span>
        </div>
      </div>
    </>

  )
}

export default Message;