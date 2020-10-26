import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { MainLayout } from "../../layout/MainLayout";
import { Selector } from "../../components/Selector";
import { SideBar } from "../../components/SideBar";
import { CardsCatalog } from "../../components/CardsCatalog";
import { Modal } from "../../components/Modal";
import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "../../components/Pagination";
import "./CardsPage.scss";

export const CardsPage = () => {
  const { logout, fetchTypes, fetchCards, userLoading } = useContext(
    AuthContext
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [type, setType] = useState(null);
  const [subtype, setSubtype] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const [cardsArray, setCardsArray] = useState([]);
  const [subTypesArray, setSubTypesArray] = useState([]);
  const [typesArray, setTypesArray] = useState([]);

  const asyncUseEffectFetchCards = async () => {
    const data = await fetchCards(page, type, subtype, pageSize);
    const json = await data.json();
    const pageCnt = Math.ceil(data.headers.get("total-count") / pageSize);
    if (pageCnt === 0) {
      setPageCount(1);
    } else {
      setPageCount(pageCnt);
    }
    setCardsArray(json.cards);
  };

  const asyncUseEffectFetchAllData = async () => {
    const res = await fetchTypes();
    setSubTypesArray(res[0].subtypes);
    setTypesArray(res[1].types);
  };

  useEffect(() => {
    asyncUseEffectFetchCards();
  }, [page]);

  useEffect(() => {
    setPage(1);
    asyncUseEffectFetchCards();
  }, [type, subtype]);

  useEffect(() => {
    asyncUseEffectFetchAllData();
  }, []);

  const cardsPageNavbarSettings = {
    enabled: true,
    leftBtn: null,
    rightBtn: (
      <Button className={"btn--dismiss"} onClick={logout} title="Logout" />
    ),
  };

  const selectSubTypeHandler = (value) => {
    setSubtype(value);
  };

  const selectTypeHandler = (value) => {
    setType(value);
  };

  const onCardClickCb = (value) => {
    setModal(true);
    setModalValue(value);
  };

  const modalClose = () => {
    setModal(false);
  };

  //   const onSelectType

  return (
    <>
      <MainLayout
        navbar={cardsPageNavbarSettings}
        content={
          <>
            <SideBar>
              <Selector
                arr={typesArray}
                defaultValue={"Type"}
                choseCallback={selectTypeHandler}
              />
              <Selector
                arr={subTypesArray}
                defaultValue={"Subtype"}
                choseCallback={selectSubTypeHandler}
              />
            </SideBar>
            <CardsCatalog
              pagination={
                <Pagination
                  disabled={userLoading}
                  page={page}
                  pageCount={pageCount}
                  setPage={setPage}
                />
              }
              onCardClick={onCardClickCb}
              cards={cardsArray}
            />
          </>
        }
      />
      {modal && modalValue && (
        <Modal card={modalValue} modalClose={modalClose} />
      )}
    </>
  );
};
