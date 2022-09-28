import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseDatabase } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { convertFirebaseTimestampToHoursAndMinuteForMessage } from '../utils/DateUtils';

const RecentChatList = () => {

  const [recentChats, setRecentChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {

    const getRecentChats = () => {
      const unsub = onSnapshot(doc(firebaseDatabase, 'userChats', currentUser.uid), (doc) => {
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
        recentChats && Object.entries(recentChats).sort((a, b) => b[1].date - a[1].date).map(recentChat =>
          <div key={recentChat[0]} className='recentChatCard' onClick={() => handleSelect(recentChat[1].userInfo)}>
            <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={recentChat[1].userInfo.photoURL} />
            <div className='recentChat'>
              <span className='recentChatUsername'>{recentChat[1].userInfo.userName}</span>
              <p className='recentChatMessage'>{recentChat[1].latestMessage && recentChat[1].latestMessage.text.length > 50 ? recentChat[1].latestMessage.text.substring(0, 50) : recentChat[1].latestMessage.text}</p>
              <p className='recentChatMessageTime'>{recentChat[1].date && convertFirebaseTimestampToHoursAndMinuteForMessage(recentChat[1].date)}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default RecentChatList