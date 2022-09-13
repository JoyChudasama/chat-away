import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';
import { fireabaseDatabase } from '../firebase';
import { collection, query, where, getDocs, setDoc, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { showToast } from '../utils/SweetAlert';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SearchBar = () => {

  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    handleUserSearch();
    return () => setUsers([]);
  }, [userName]);

  const handleUserSearch = async () => {

    const searchQuery = query(collection(fireabaseDatabase, "users"), where("userName", "==", userName));

    try {
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach(doc => {
        doc.data().uid !== currentUser.uid && setUsers(prevUsers => [...prevUsers, doc.data()])
      });
    } catch (e) {
      showToast({
        title: 'Oops..Something went wrong.',
        position: 'top-end',
        icon: 'error',
        timer: 2000,
        isShowTimeProgressBar: 'error',
        isShowConfirmButton: false,
        customClass: 'sweetalert sweetalertToast'
      });
    }

  };

  const handleSelect = async (selectedUser) => {
    const combinedId = currentUser.uid > selectedUser.uid ?
      currentUser.uid + selectedUser.uid
      : selectedUser.uid + currentUser.uid

    try {

      const res = await getDoc(doc(fireabaseDatabase, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(fireabaseDatabase, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(fireabaseDatabase, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: selectedUser.uid,
            userName: selectedUser.userName
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(fireabaseDatabase, 'userChats', selectedUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            userName: currentUser.displayName
          },
          [combinedId + '.date']: serverTimestamp()
        })
      }


    } catch (e) {
      showToast({
        title: 'Oops..Something went wrong.',
        position: 'top-end',
        icon: 'error',
        timer: 2000,
        isShowTimeProgressBar: 'error',
        isShowConfirmButton: false,
        customClass: 'sweetalert sweetalertToast'
      });
    }

    setUsers([]);
    setUserName('');
  }

  return (
    <div className='searchBar'>

      <div className='searchForm'>
        <input type='text' placeholder='Search Username' onChange={e => {
          setUserName(e.target.value)
          handleUserSearch()
        }}
          value={userName}
        />

      </div>
      {
        users && users.map(user =>
          <div key={user.uid} className='searchResultContainerWrapper' onClick={() => handleSelect(user)}>
            <div className='searchResultContainer'>
              <Avatar className='searchResultProfilePicture' alt="Profile Picture" src={tempAvatar} />
              <div className='searchResultUserName'>
                <span>{user.userName}</span>
              </div>
            </div>
          </div>
        )}


    </div >
  )
}

export default SearchBar;