import React from "react";
import { NavBar } from "../../components/NavBar";
import "./MainLayout.scss";

export const MainLayout = ({ navbar, content }) => {
  const navBarElement = navbar.enabled ? (
    <NavBar
      leftBtn={navbar.leftBtn || <div></div>}
      rightBtn={navbar.rightBtn}
    />
  ) : (
    <div></div>
  );

  return (
    <div className="main">
      {navBarElement}
      <div className="main__wrapper">{content}</div>
    </div>
  );
};
