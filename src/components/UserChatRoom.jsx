import React, { useContext, useEffect, useState } from 'react'
import ChatRoomNavBar from './ChatRoomNavBar';
import ChatRoomMessages from './ChatRoomMessages';
import UserChatInput from './UserChatInput';
import { ChatContext } from '../context/ChatContext';
import { isEmpty } from '@firebase/util';
import { SearchChat } from '../context/SearchChat';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseDatabase } from '../firebase';

const UserChatRoom = () => {

  const { data } = useContext(ChatContext);
  const { searchChatContext, dispatch } = useContext(SearchChat);
  // const { currentUser, user } = useContext(AuthContext);

  const [matchedWordCount, setMatchedWordCount] = useState(0);
  const [isUserBlocked, setIsUserBlocked] = useState(false);

  const handleCloseSerchChat = () => {
    setMatchedWordCount(0);
    dispatch({ type: "RESET_SEARCH_CHAT" });
  }

  useEffect(() => {
    const highlightedTextSpans = [...document.getElementsByClassName('highlight')];
    setMatchedWordCount(highlightedTextSpans.length);
  }, [searchChatContext.searchTerm])

  // useEffect(() => {

  //   onSnapshot(doc(firebaseDatabase, 'users', currentUser.uid), (doc) => {
  //     if (doc.exists()) {
  //       doc.data().hasBlocked.includes(data.user.uid) ? setIsUserBlocked(true) : setIsUserBlocked(false);
  //     }
  //   });

  // }, [])



  return (
    <>
      {
        !isEmpty(data.user) &&

        <div className='userChatRoom'>

          <ChatRoomNavBar />

          {searchChatContext.isShowInput ?

            <div className='searchChatContainer'>

              <input placeholder='Search Chat...' onChange={e => {
                dispatch({ type: "USER_ENTERED_VALUE", payload: { searchTerm: e.target.value.toLowerCase() } })
              }} />

              <span>Found: {matchedWordCount}</span>

              <IconButton onClick={handleCloseSerchChat} color='error' >
                <HighlightOffRoundedIcon />
              </IconButton>
            </div>
            : ''
          }

          <ChatRoomMessages />

          {
            !isUserBlocked && <UserChatInput />
          }

        </div>
      }
    </>
  )
}

export default UserChatRoom;