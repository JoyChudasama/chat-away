import React, { useContext } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Avatar, IconButton } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { fireabaseDatabase, firebaseStorage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRef } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const UserChatInput = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const chatInput = useRef();


  const handleSendMessage = async () => {

    try {

      if (!img) {
        await updateDoc(doc(fireabaseDatabase, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now().toDate()
          })
        });
      } else {

        const storageRef = ref(firebaseStorage, `img/chats/${data.chatId}/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(fireabaseDatabase, 'chats', data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL
                })
              });
            })
          }
        )
      }

      await updateDoc(doc(fireabaseDatabase, 'userChats', currentUser.uid), {
        [data.chatId + ".latestMessage"]: {
          text: text ? 'sent: ' + text : img ? 'sent: img' : ''
        },
        [data.chatId + '.date']: serverTimestamp()
      });

      await updateDoc(doc(fireabaseDatabase, 'userChats', data.user.uid), {
        [data.chatId + ".latestMessage"]: {
          text: text ? 'recived: ' + text : img ? 'recived: img' : ''
        },
        [data.chatId + '.date']: serverTimestamp()
      });

    } catch (error) {
      console.log(error)
    }

    setText('');
    setImg(null);
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSendMessage();
  }

  const handleRemoveImage = () => {
    setImg(null);
  }

  return (
    <div className='userInputsContainer'>
      <div className='userChatInputsContainer'>
        {img && <Avatar className='selectedImage' sx={{ width: '3rem', height: '3rem' }} alt="uploaded img" src={URL.createObjectURL(img)} />}
        {img && <IconButton id='sendButton' size='small' color='error' onClick={handleRemoveImage}>
          <ClearRoundedIcon fontSize='small' />
        </IconButton>}

        <input type='text' placeholder='Message' className='userChatMessageInput' onChange={e => setText(e.target.value)} onKeyDown={handleKey} ref={chatInput} value={text} />

        <div className='userChatFileInputContainer'>
          <input type='file' className='d-none' id="userChatFileInput" accept='image/png, image/gif, image/jpeg' onChange={e => setImg(e.target.files[0])} />
          <label htmlFor='userChatFileInput' className='userFileInputLabel' >
            <AddPhotoAlternateRoundedIcon />
          </label>
        </div>

      </div>

      <div className='sendButtonContainer'>
        <IconButton id='sendButton' onClick={handleSendMessage} disabled={!text && !img ? true : false}>
          <SendRoundedIcon />
        </IconButton>
      </div>
    </div>


  )
}

export default UserChatInput;