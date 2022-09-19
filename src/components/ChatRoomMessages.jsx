import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { firebaseDatabase } from '../firebase';
import Message from './Message'

const ChatRoomMessages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const unsub = onSnapshot(doc(firebaseDatabase, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(() => doc.data().messages);
    });

    return () => unsub();

  }, [data.chatId])

 
  return (
    <div className='chatRoomMessages' id="chatRoomMessages">
      {
        messages.length > 0
          ? messages.map(message =>
            <Message key={message.id} message={message} />
          )
          :
          data.user.userName && <div className='haventStartedConversation'>
            This is the start of your conversation with {data.user.userName}
          </div>
      }
    </div>
  )
}

export default ChatRoomMessages;