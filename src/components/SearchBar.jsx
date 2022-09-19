import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { firebaseDatabase } from '../firebase';
import { collection, query, where, getDocs, setDoc, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { showToast } from '../utils/SweetAlert';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRef } from 'react';

const SearchBar = () => {

  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const searchInput = useRef();

  useEffect(() => {
    handleUserSearch();
    return () => setUsers([]);
  }, [userName]);

  const handleUserSearch = async () => {

    const searchQuery = query(collection(firebaseDatabase, "users"), where("userName", "==", userName));

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

      const res = await getDoc(doc(firebaseDatabase, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(firebaseDatabase, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(firebaseDatabase, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: selectedUser.uid,
            userName: selectedUser.userName,
            photoURL: selectedUser.photoURL,
            email: selectedUser.email,
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(firebaseDatabase, 'userChats', selectedUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            userName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email: selectedUser.email,
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

  const handleKey = (e) => {
    if (e.code === 'Backspace' && searchInput.current.value === '') setUserName('');
  }


  return (
    <div className='searchBar'>

      <div className='searchForm'>
        <input type='text' placeholder='Search Username' onChange={e => {
          setUserName(e.target.value)
          handleUserSearch()
        }}
          value={userName}
          onKeyDown={handleKey}
          ref={searchInput}
        />

      </div>
      {
        users.length > 0 ? users.map(user =>
          <div key={user.uid} className='searchResultContainerWrapper' onClick={() => handleSelect(user)}>
            <div className='searchResultContainer'>
              <Avatar className='searchResultProfilePicture' alt="Profile Picture" src={user.photoURL} />
              <div className='searchResultUserName'>
                <span>{user.userName}</span>
              </div>
            </div>
          </div>
        )
          : userName && <div className='searchResultContainerWrapper'>
            <div className='searchResultContainer'>

              <div className='searchResultUserName'>
                <span>No User Found</span>
              </div>
            </div>
          </div>


      }

    </div >
  )
}

export default SearchBar;