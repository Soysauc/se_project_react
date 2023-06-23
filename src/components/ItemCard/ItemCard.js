import './ItemCard.css';

const ItemCard = ({ clothingChoice, onClick }) => {
  console.log(clothingChoice);
  return (
    <li className='item-card' onClick={onClick}>
      <h5 className='item-card__title'>{clothingChoice.name}</h5>
      <img
        className='item-card__image'
        src={clothingChoice.imageURL}
        alt={clothingChoice.name}
      />
    </li>
  );
};

export default ItemCard;
