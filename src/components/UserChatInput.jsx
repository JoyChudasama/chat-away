import React from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
const UserChatInput = () => {
  return (
    <div className='userInputsContainer'>
      <div className='userChatInputsContainer'>

        <input type='text' placeholder='Message' className='userChatMessageInput' />

        <div className='userChatFileInputContainer'>
          <input type='file' className='d-none' id="userChatFileInput" accept='image/png, image/gif, image/jpeg' />
          <label htmlFor='userChatFileInput' className='userFileInputLabel'>
            <AddPhotoAlternateRoundedIcon />
          </label>
        </div>

      </div>

      <div className='sendButtonContainer'>
        <IconButton id='sendButton' >
          <SendRoundedIcon />
        </IconButton>
      </div>
    </div>


  )
}

export default UserChatInput;