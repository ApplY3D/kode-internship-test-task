import React from "react";
import "./Input.scss";

export const Input = ({
  title,
  disabled,
  value,
  type = "text",
  onChange: onChangeCb,
  onSubmit: onSubmitCb,
}) => {
  const onChangeHandler = (e) => {
    if (onChangeCb) {
      onChangeCb(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    if (e.keyCode === 13 || e.code === "Enter" || e.key === "Enter") {
      if (onSubmitCb) {
        onSubmitCb();
      }
    }
  };

  return (
    <div className="input-group">
      {title ? <label htmlFor={title}>{title}</label> : ""}
      <input
        disabled={disabled}
        className="input"
        onKeyPress={onSubmitHandler}
        id={title}
        value={value}
        onChange={onChangeHandler}
        type={type}
      ></input>
    </div>
  );
};
