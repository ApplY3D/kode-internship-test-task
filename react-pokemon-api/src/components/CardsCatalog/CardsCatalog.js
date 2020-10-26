import React, { useContext } from "react";
import "./CardsCatalog.scss";
import { Card } from "../Card";
import { AuthContext } from "../../context/AuthContext";

export const CardsCatalog = ({
  cards,
  onCardClick: onCardClickCb,
  pagination,
}) => {
  const { userLoading } = useContext(AuthContext);
  return (
    <div className="cards-catalog__wrapper">
      <div className="cards-catalog">
        {cards.length === 0 && !userLoading && "No cards found :c"}
        {cards.map((card) => (
          <Card onClick={onCardClickCb} key={card.id} card={card} />
        ))}
      </div>
      {pagination}
    </div>
  );
};
