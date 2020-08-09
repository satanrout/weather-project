import React from "react";
import "./header.style.css";
import cloud from "./cloud.svg";

const Header = () => {
  return (
    <header className="header_container">
      <div className="logo_container">
        <img className="logo" alt="Hot&Cold" src={cloud} width="48px" />
      </div>
      <div className="location">Bhuinpur</div>
    </header>
  );
};

export default Header;
