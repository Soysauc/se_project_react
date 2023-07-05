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
  handleLikeClick,
}) {
  const myClothingChoices = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className='profile'>
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        openEditModal={openEditModal}
      />
      <ClothesSection
        clothingItems={myClothingChoices}
        handleCardClick={handleCardClick}
        openModal={openModal}
        isLoggedIn={isLoggedIn}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}

export default Profile;
