import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';
import { fireabseDatabase } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
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

    const searchQuery = query(collection(fireabseDatabase, "users"), where("userName", "==", userName));

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

  return (
    <div className='searchBar'>

      <div className='searchForm'>
        <input type='text' placeholder='Search Username' onChange={e => {
          setUserName(e.target.value)
          handleUserSearch()
        }} />

      </div>
      {
        users && users.map(user =>
          <div className='searchResultContainerWrapper'>
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