import "./ItemModal.css";

function ItemModal({ isOpen, name, card, onClose }) {
  return (
    <div
      className={
        isOpen ? `popup modal_name_${name}` : `modal_name_${name} popup_closed`
      }
    >
      <div className="popup__body">
        <button className="popup__close-btn" onClick={onClose} />
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__name">{card.name}</h3>
        <p className="popup__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
