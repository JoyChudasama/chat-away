import React, { useContext } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { fireabaseDatabase, firebaseStorage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const UserChatInput = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

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

        const storageRef = ref(firebaseStorage, uuid());
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
          text: 'sent: ' + text
        },
        [data.chatId + '.date']: serverTimestamp()
      });

      await updateDoc(doc(fireabaseDatabase, 'userChats', data.user.uid), {
        [data.chatId + ".latestMessage"]: {
          text: 'recieved: ' + text
        },
        [data.chatId + '.date']: serverTimestamp()
      });

    }catch(error){
      console.log(error)
    }

    setText('');
    setImg(null);
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSendMessage();
  }

  return (
    <div className='userInputsContainer'>
      <div className='userChatInputsContainer'>

        <input type='text' placeholder='Message' className='userChatMessageInput' onChange={e => setText(e.target.value)} onKeyDown={handleKey} value={text} />

        <div className='userChatFileInputContainer'>
          <input type='file' className='d-none' id="userChatFileInput" accept='image/png, image/gif, image/jpeg' onChange={e => setImg(e.target.files[0])} />
          <label htmlFor='userChatFileInput' className='userFileInputLabel'>
            <AddPhotoAlternateRoundedIcon />
          </label>
        </div>

      </div>

      <div className='sendButtonContainer'>
        <IconButton id='sendButton' onClick={handleSendMessage} >
          <SendRoundedIcon />
        </IconButton>
      </div>
    </div>


  )
}

export default UserChatInput;