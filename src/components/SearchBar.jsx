import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';
import { fireabseDatabase } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { showToast } from '../utils/SweetAlert';
import { isEmpty } from '@firebase/util';
import { useEffect } from 'react';

const SearchBar = () => {

  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState(null);

  const handleKey = (e) => {
    e.code === 'Enter' && searchUser();
  }

  const searchUser = async () => {
    try {
      const searchQuery = query(collection(fireabseDatabase, "users"), where("userName", "==", userName));
      const foundUsers = await getUsers(searchQuery);

      setUsers(foundUsers);

      console.log(users)
    } catch (e) {
      console.log(e)
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

  const getUsers = async (searchQuery) => {
    const querySnapshot = await getDocs(searchQuery);

    return querySnapshot.docs.map(doc => {
      return doc.data();
    })
  }

  return (
    <div className='searchBar'>
      <div className='searchForm'>
        <input type='text' placeholder='Search Username' onChange={e => setUserName(e.target.value)} onKeyDown={handleKey} />
      </div>

      {
        users && users.map(user => {
          <div className='searchResult'>
            <Avatar className='searchResultProfilePicture' alt="Profile Picture" src={tempAvatar} />
            <div className='searchResultUserName'>
              <span>{user.userName}</span>
            </div>
          </div>
        })
      }

    </div >
  )
}

export default SearchBar