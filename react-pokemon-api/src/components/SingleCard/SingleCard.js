import React from "react";
import "./SingleCard.scss";

export const SingleCard = ({ card }) => {
  return (
    <div className="single-card">
      <div className="single-card__info">
        <div className="single-card__img-container">
          <img alt={card.name} src={card.imageUrlHiRes} />
        </div>
        <div className="single-card__about-information">
          <h1> {card.name}</h1>
          <h2> {card.types}</h2>
          <h2> {card.subtype}</h2>

          {card.attacks?.length > 0 && (
            <>
              <div className="single-card__attacks">
                <h4 style={{ textAlign: "center", padding: "1rem" }}>
                  Attacks:
                </h4>
                {card.attacks?.map((a) => {
                  return (
                    <div key={a.name} className="attack">
                      <p className="attack__title">
                        {a.name} Deals{" "}
                        <span className="attack__damage">
                          {a.damage || 0} damage
                        </span>
                      </p>
                      {a.cost?.length !== 0 && <p>And costs:</p>}
                      {a.cost?.map((c, i) => {
                        return (
                          <p key={`${c}-${i}`} className="attack__cost">
                            - {c}
                          </p>
                        );
                      })}
                      {a.text && <p className="attack__text">{a.text}</p>}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {card.resistances?.length > 0 && (
            <>
              <div className="single-card__resistances">
                <h4 style={{ textAlign: "center", padding: "1rem" }}>
                  Resistances:
                </h4>
                {card.resistances?.map((r) => {
                  return (
                    <div key={r.type} className="resistance">
                      <p className="resistance-type">{r.type} </p>
                      <span className="resistance-value">{r.value}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {card.evolvesFrom ? (
            <div className="single-card__evolves">
              Evolves From {card.evolvesFrom}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
