import React from "react";
import "./Card.scss";

export const Card = ({ card, onClick: onClickCb }) => {
  return (
    <div className="card" onClick={onClickCb.bind(null, card)}>
      <img alt={card.name} src={card.imageUrl} />
      <div className="card__information">
        {card.name ? <p>Name - {card.name}</p> : ""}
        {card.artist ? <p>Artist - {card.artist}</p> : ""}
      </div>
    </div>
  );
};
