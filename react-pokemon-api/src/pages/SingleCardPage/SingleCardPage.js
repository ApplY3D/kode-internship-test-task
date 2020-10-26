import React, { useContext, useEffect, useState } from "react";
import "./SingleCardPage.scss";
import { useHistory, useParams } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";
import { Button } from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";
import { SingleCard } from "../../components/SingleCard";

export const SingleCardPage = () => {
  const { logout, fetchSingleCard } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();

  const [singleCard, setSingleCard] = useState(null);

  useEffect(() => {
    async function asyncUseEffect() {
      const data = await fetchSingleCard(id);
      setSingleCard(data.card);
    }
    asyncUseEffect();
  }, []);

  const singleCardPageNavbarSettings = {
    enabled: true,
    leftBtn: <Button onClick={history.goBack.bind(null)} title="< Back" />,
    rightBtn: (
      <Button className={"btn--dismiss"} onClick={logout} title="Logout" />
    ),
  };

  return (
    <MainLayout
      navbar={singleCardPageNavbarSettings}
      content={singleCard !== null && <SingleCard card={singleCard} />}
    />
  );
};
