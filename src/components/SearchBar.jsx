import React from 'react'
import Avatar from '@mui/material/Avatar';
import tempAvatar from '../img/avatar.jpg';

const SearchBar = () => {
  return (
    <div className='searchBar'>
      <div className='searchForm'>
        <input type='text' placeholder='Search Username'/>
      </div>

      <div className='searchResult'>
        <Avatar className='searchResultProfilePicture' alt="Profile Picture" src={tempAvatar} />
        <div className='searchResultUserName'>
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar