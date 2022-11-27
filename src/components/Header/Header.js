// A child component of Header.js. The component includes:
// A logo

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

//florida is a placeholder
function Header() {
  return (
    <ul className="header">
      <li className="header__logo">
        <img src="../Images/wtwr-logo.svg" alt="What-to-wear-Logo"></img>
      </li>
      <li className="header__text"> {currentDate}, Florida </li>
      <li className="header__text"> + Add clothes</li>
      <li className="header__text"> Terrence Tegegne</li>
      <li className="header__avatar"></li>
    </ul>
  );
}

export default Header;

// The current location (see Section 4 for details)
// An “Add Clothes” button that opens ModalWithForm
// The user’s name and avatar (both are hardcoded at this point)
