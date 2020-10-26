import React from "react";
import { Button } from "../Button";
import "./Modal.scss";
import { useHistory } from "react-router-dom";

export const Modal = ({ card, modalClose }) => {
  const history = useHistory();

  const modalCloseHandler = (e) => {
    if (e.target === document.getElementById("modal")) {
      if (modalClose) {
        modalClose();
      }
    }
  };

  const navigateToCardPage = (id) => {
    history.push(`/card/${id}`);
  };

  return (
    <div id="modal" className="modal" onClick={modalCloseHandler}>
      <div className="modal__info">
        <div className="modal__img-container">
          <img alt={card.name} src={card.imageUrlHiRes}></img>
        </div>
        <div className="modal__about-information">
          <h1>{card.name}</h1>
          <h2>{card.types}</h2>
          <h2>{card.subtype}</h2>
          <br />
          {card.attacks?.map((a) => {
            return (
              <React.Fragment key={a.name}>
                <p>
                  <span>{a.name}</span> - <span>{a.damage}</span>
                </p>
                {a.cost?.map((c, i) => {
                  return (
                    <React.Fragment key={`${c}-${i}`}>
                      <b> {c}</b>
                      <br />
                    </React.Fragment>
                  );
                })}
                <br />
              </React.Fragment>
            );
          })}
          <div className="modal__close-btn">
            <Button className="btn--dismiss" onClick={modalClose} title="×" />
          </div>
          <div className="modal__away-btn">
            <Button
              className="btn--success"
              onClick={navigateToCardPage.bind(null, card.id)}
              title="More information..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
