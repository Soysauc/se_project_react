import './SideBar.css';
import React from 'react';

function SideBar({ currentUser, openEditModal, handleLogout }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__user'>
        {currentUser.avatar === '' ? (
          <div className='sidebar__user-icon_placeholder'>
            {currentUser.name[0]}
          </div>
        ) : (
          <img
            className='sidebar__user-icon'
            src={currentUser.avatar}
            alt='User avatar'
          />
        )}
        <h2 className='sidebar__username'>{currentUser.name}</h2>
      </div>
      <button className='sidebar__button' onClick={openEditModal}>
        Change profile data
      </button>
      <button className='sidebar__button' onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
export default SideBar;
