import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import defaultAvatar from '../img/default/defaultAvatar2.png';
import { doc, onSnapshot } from 'firebase/firestore';
import { fireabaseDatabase } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const RecentChatList = () => {

  const [recentChats, setRecentChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {

    const getRecentChats = () => {
      const unsub = onSnapshot(doc(fireabaseDatabase, 'userChats', currentUser.uid), (doc) => {
        setRecentChats(doc.data());
      });

      return () => unsub();
    }

    currentUser.uid && getRecentChats();

  }, [currentUser.uid])

  const handleSelect = (selectedUser) => {
    dispatch({ type: "CHANGE_USER", payload: selectedUser });
  }

  return (
    <div className='recentChatList'>

      {
        recentChats && Object.entries(recentChats).sort((a,b)=>b[1].date - a[1].date).map(recentChat =>
          <div key={recentChat[0]} className='recentChatCard' onClick={() => handleSelect(recentChat[1].userInfo)}>
            <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={defaultAvatar} />
            <div className='recentChat'>
              <span className='recentChatUsername'>{recentChat[1].userInfo.userName}</span>
             
              <div className='recentChatInfo'>
                <p className='recentChatMessage'>{recentChat[1].latestMessage && recentChat[1].latestMessage.text}</p>
                <p className='recentChatMessageTime'>{recentChat[1].date && new Date(recentChat[1].date.seconds * 1000).toLocaleTimeString('default', {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          </div>
        )
      }



    </div>
  )
}

export default RecentChatList