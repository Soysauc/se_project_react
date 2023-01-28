import React from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";
import logoPath from "../../images/wtwr-logo.svg";
import avatarDefault from "../../images/Avatar.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, handleAddClick }) => {
  if (!weatherData) return null;

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <img src={logoPath} alt="wtrt logo" className="header__logo" />
        </Link>
        <h2 className="header__date">
          {currentDate}, {weatherData.city}
        </h2>
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-button"
        >
          + Add clothes
        </button>
        <Link
          to={"/profile"}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 className="header__user-name">{username}</h2>
          <img
            className="header__user-icon"
            src={avatarDefault}
            alt="User avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
