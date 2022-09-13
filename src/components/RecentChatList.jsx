import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';
import defaultAvatar from '../img/defaultAvatar.png';
import { doc, onSnapshot } from 'firebase/firestore';
import { fireabaseDatabase } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RecentChatList = () => {
  const [recentChats, setRecentChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {


    const getRecentChats = () => {
      const unsub = onSnapshot(doc(fireabaseDatabase, 'userChats', currentUser.uid), (doc) => {
        setRecentChats(doc.data());
      });

      return () => unsub();
    }

    currentUser.uid && getRecentChats();

  }, [currentUser.uid])



  return (
    <div className='recentChatList'>

      {
        Object.entries(recentChats)?.map(recentChat =>
          <div key={recentChat[0]} className='recentChatCard'>
            <Avatar className='recentChatProfilePicture' alt="Profile Picture" src={tempAvatar} />
            <div className='recentChat'>
              <span className='recentChatUsername'>{recentChat[1].userInfo.userName}</span>
              <p className='recentChatMessage'>Recent chat recent message</p>
            </div>
          </div>
        )
      }



    </div>
  )
}

export default RecentChatList