import React, { useContext } from 'react'
import ChatRoomNavBar from './ChatRoomNavBar';
import ChatRoomMessages from './ChatRoomMessages';
import UserChatInput from './UserChatInput';
import { ChatContext } from '../context/ChatContext';
import { isEmpty } from '@firebase/util';
import { SearchChat } from '../context/SearchChat';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import IconButton from '@mui/material/IconButton';
const UserChatRoom = () => {

  const { data } = useContext(ChatContext);
  const { searchChatContext, dispatch } = useContext(SearchChat);


  const handleSearchChat = () => {
    // const messageTexts = [...document.getElementsByClassName('messageText')];
    // console.log(messageTexts)
    // messageTexts.forEach(messageTextSpan => {

    //     if (messageTextSpan.innerHTML.includes(result.value)) {
    //         messageTextSpan.classList.add('highlight');
    //     }
    // });
  }

  const handleCloseSerchChat = () => {
    dispatch({ type: "RESET_SEARCH_CHAT" });
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearchChat();
  }


  return (
    <>
      {
        !isEmpty(data.user) &&
        <div className='userChatRoom'>

          <ChatRoomNavBar />

          {searchChatContext.isShowInput ?
            <div className='searchChatContainer'>
              <input placeholder='search chat...' onKeyDown={e => handleKey(e)} />
              <IconButton onClick={handleSearchChat}>
                <SearchRoundedIcon />
              </IconButton>
              <IconButton onClick={handleCloseSerchChat}>
                <HighlightOffRoundedIcon />
              </IconButton>
            </div>
            : ''
          }


          <ChatRoomMessages />
          <UserChatInput />
        </div>
      }
    </>
  )
}

export default UserChatRoom;