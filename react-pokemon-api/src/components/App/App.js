import React, { useState, useMemo } from "react";
import "./App.scss";
import { AuthContext } from "../../context/AuthContext";
import { validateLogin, validate2FA, validateLogout } from "../../utils";
import { useRoutes } from "../../routes";
import { Loading } from "../Loading";

export const App = () => {
  const storageName = "userInfo";
  let localUser = JSON.parse(localStorage.getItem(storageName));
  localUser =
    localUser?.email && localUser?.password && localUser.token
      ? localUser
      : null;
  const isTokenValid = localUser && Date.now() < localUser.token;
  const [user, setUser] = useState(
    isTokenValid && localUser ? localUser : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    isTokenValid && localUser ? true : false
  );
  const [userLoading, setUserLoading] = useState(false);

  const [tempUserData, setTempUserData] = useState(null); // Если человек прошел 1 шаг логина

  const routes = useRoutes(isAuthenticated);

  const login = async (email, password) => {
    setUserLoading(true);
    const isLoginValid = await validateLogin(email, password);
    setUserLoading(false);

    if (isLoginValid.success) {
      setTempUserData({ email, password });
      return { success: true };
    } else {
      return isLoginValid;
      // Login failed
    }
  };

  const login2FA = async (num) => {
    setUserLoading(true);
    const is2FAValid = await validate2FA(num);
    setUserLoading(false);
    if (is2FAValid.success) {
      setIsAuthenticated(true);
      setUser(tempUserData);
      setTempUserData(null);
      localStorage.setItem(
        storageName,
        JSON.stringify({ ...tempUserData, token: is2FAValid.token })
      );
      return { success: true };
    } else {
      return is2FAValid;
    }
  };

  const logout = async () => {
    setUserLoading(true);
    const loggedOut = await validateLogout();
    setUserLoading(false);
    if (loggedOut.success) {
      setIsAuthenticated(false);
      setUser(null);
      setTempUserData(null);
      localStorage.removeItem(storageName);
    }
  };

  const fetchCards = async (page = 1, type, subtype, pageSize = 10) => {
    setUserLoading(true);
    const data = await fetch(
      `https://api.pokemontcg.io/v1/cards?page=${page}&pageSize=${pageSize}${
        type ? `&types=${type}` : ""
      }${subtype ? `&subtype=${subtype}` : ""}`
    );
    setUserLoading(false);
    return data;
  };

  const fetchTypes = async () => {
    setUserLoading(true);
    let promiseType = fetch("https://api.pokemontcg.io/v1/types");
    let promiseSubType = fetch("https://api.pokemontcg.io/v1/subtypes");

    const res = await Promise.all([promiseSubType, promiseType]);
    const json = await Promise.all(res.map((r) => r?.json()));
    setUserLoading(false);
    return json;
  };

  const fetchSingleCard = async (id) => {
    setUserLoading(true);
    const data = await fetch(`https://api.pokemontcg.io/v1/cards/${id}`);
    const json = await data.json();
    setUserLoading(false);
    return json;
  };

  const provider = useMemo(
    () => ({
      isAuthenticated,
      user,
      userLoading,
      tempUserData,
      login2FA,
      logout,
      login,
      fetchTypes,
      fetchCards,
      fetchSingleCard,
    }),
    [
      isAuthenticated,
      user,
      userLoading,
      tempUserData,
      login2FA,
      logout,
      login,
      fetchTypes,
      fetchCards,
      fetchSingleCard,
    ]
  );

  return (
    <AuthContext.Provider value={provider}>
      {userLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <div className="app">{routes}</div>
    </AuthContext.Provider>
  );
};
