import './Profile.css';
import React from 'react';
import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';

function Profile({
  currentUser,
  clothingItems,
  handleCardClick,
  openModal,
  openEditModal,
  isLoggedIn,
  handleLogout,
}) {
  return (
    <div className='profile'>
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        openEditModal={openEditModal}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        openModal={openModal}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
