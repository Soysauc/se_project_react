import React from "react";
import "./Header.css";
// import "./Navigation.css";
import logoPath from "../../images/wtwr-logo.svg";
import avatarDefault from "../../images/Avatar.svg"; //get image

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, handleAddClick }) => {
  if (!weatherData) return <header> Weather Data is Null </header>;

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="wtrt logo" className="header__logo" />
        <h2 className="header__date">
          {currentDate}, {weatherData.city}
        </h2>
        <button
          onClick={handleAddClick}
          type="button"
          className="navigation__button"
        >
          + Add clothes
        </button>
        <h2 className="header__user-name">{username}</h2>
        <img
          className="header__user-icon"
          src={avatarDefault}
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;
