import './ClothesSection.css';
import React, { useContext } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({
  clothingItems,
  handleCardClick,
  openModal,
  isLoggedIn,
  handleLikeClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='profile__clothes-section'>
      <div className='profile__clothes-section-header'>
        <h2 className='profile__clothes-section-title'>Your items</h2>
        <button
          className='profile__add-clothes-btn'
          type='button'
          onClick={openModal}
        >
          + Add new
        </button>
      </div>

      <ul className='profile__clothes-section-items'>
        {clothingItems.map((item) => (
          <ItemCard
            // isOpen='false'
            clothingChoice={item}
            key={item.id}
            // name={item.name}
            // image={item.imageUrl}
            // weather={item.weather}
            handleLikeClick={() => {
              handleLikeClick(
                item._id,
                item.likes.includes(currentUser._id),
                currentUser
              );
            }}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
