import React from "react";
import "./NavBar.scss";

export const NavBar = ({ leftBtn, rightBtn }) => {
  return (
    <div className="navbar">
      {leftBtn} {rightBtn}
    </div>
  );
};
