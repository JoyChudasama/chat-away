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
  
  
  useEffect(()=>{
    if(userName.length > 0){
      try {
        const searchQuery = query(collection(fireabseDatabase, "users"), where("userName", "==", userName));
        getUsers(searchQuery).then(users=>{
          users.forEach(user => {
              setUsers(prevState => {
              return  [...prevState, user];
            })
          });
        });
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
    }

    // return () => {
    //   // cancel the subscription
    //   setUsers([]);
    // };
  },[userName]);

  const getUsers = async (searchQuery) => {
    const querySnapshot = await getDocs(searchQuery);

    return querySnapshot.docs.map(doc => {
      return doc.data();
    })
  }
  console.log(users)

  return (
    <div className='searchBar'>
      <div className='searchForm'>
        <input type='text' placeholder='Search Username' onChange={e => setUserName(e.target.value)} value={userName} />
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