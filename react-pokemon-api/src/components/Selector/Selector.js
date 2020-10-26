import React, { useState, useEffect } from "react";
import { Input } from "../Input";
import "./Selector.scss";

export const Selector = ({
  arr,
  choseCallback,
  defaultValue = "Не выбрано",
}) => {
  const [filtered, setFiltered] = useState(arr);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFiltered((arr = arr?.length > 0 ? [null, ...arr] : [null]));
  }, [arr]);

  useEffect(() => {
    filterArr(inputValue);
  }, [inputValue, setInputValue]);

  const filterArr = (value) => {
    const filtered = arr.filter(
      (a) => a?.toLowerCase().includes(value.toLowerCase()) || a === null
    );
    setFiltered([null, ...filtered]);
  };

  const toggleIsOpen = () => {
    setIsOpen((v) => !v);
  };

  const chooseItem = (value) => {
    if (value === selected) return toggleIsOpen();
    toggleIsOpen();
    setSelected(value);
    if (choseCallback) {
      choseCallback(value);
    }
  };

  return (
    <div className={`selector ${isOpen ? "selector--active" : ""}`}>
      <div onClick={toggleIsOpen} className="selector__selected">
        {selected || defaultValue}
      </div>
      <ul className="selector__options">
        <Input value={inputValue} onChange={setInputValue} />
        {filtered.map((item, i) => (
          <li
            key={`${item}-${i}`}
            onClick={chooseItem.bind(null, item)}
            className={`selector__item ${
              selected === item ? "selector__item--selected" : ""
            }`}
          >
            {item || defaultValue}
          </li>
        ))}
      </ul>
    </div>
  );
};
