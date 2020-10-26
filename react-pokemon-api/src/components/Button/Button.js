import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Button.scss";

export const Button = ({
  title,
  className = "",
  disabled,
  onClick: onClickCb,
}) => {
  const { userLoading } = useContext(AuthContext);
  return (
    <button
      disabled={userLoading || disabled}
      className={`btn ${className} ${disabled ? "btn--disabled" : ""}`}
      onClick={onClickCb}
    >
      {title}
    </button>
  );
};
