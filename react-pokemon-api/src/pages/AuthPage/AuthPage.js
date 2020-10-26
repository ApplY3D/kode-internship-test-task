import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Input } from "../../components/Input/";
import { Button } from "../../components/Button";
import "./AuthPage.scss";

export const AuthPage = () => {
  const [email, setEmail] = useState("kode@kode.ru");
  const [password, setPassword] = useState("Enk0deng");
  const [secondFA, setSecondFA] = useState("");
  const [animation, setAnimation] = useState(false);
  const [showHiddenElements, setShowHiddenElements] = useState(false);
  const [error, setError] = useState("");
  const { tempUserData, login, logout, login2FA, userLoading } = useContext(
    AuthContext
  );

  const toggleAnimation = () => {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };

  const loginHandler = async () => {
    setError("");
    setShowHiddenElements(true);
    const result = await login(email, password);
    if (result.success) {
      toggleAnimation();
      setShowHiddenElements(false);
    } else {
      setShowHiddenElements(false);
      setError(result.error);
    }
  };

  const login2FAHandler = async () => {
    setError("");
    const result = await login2FA(secondFA);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleBackFrom2FABtn = async () => {
    setShowHiddenElements(true);
    await logout();
    toggleAnimation();
    setError("");
    setShowHiddenElements(false);
  };

  return (
    <div className={`auth ${tempUserData ? "auth-2fa" : ""}`}>
      {(!tempUserData || animation || showHiddenElements) && (
        <div className="auth__wrapper auth__wrapper--login">
          <div className="auth__inputs">
            <>
              <Input
                disabled={userLoading}
                title="Email"
                value={email}
                onChange={setEmail}
                onSubmit={loginHandler}
              />
              <Input
                disabled={userLoading}
                title="Password"
                value={password}
                type="password"
                onChange={setPassword}
                onSubmit={loginHandler}
              />
            </>
          </div>
          <div className="auth__error">{error ? error : ""}</div>
          <div className="auth__tools">
            <Button
              disabled={userLoading}
              className="btn--success"
              title="Submit"
              onClick={loginHandler}
            />
          </div>
        </div>
      )}

      {(tempUserData || animation || showHiddenElements) && (
        <div className="auth__wrapper auth__wrapper--2fa">
          <div className="auth__inputs">
            <Input
              disabled={userLoading}
              title="2FA Code"
              value={secondFA}
              onChange={setSecondFA}
              onSubmit={login2FAHandler}
            />
          </div>
          <div className="auth__error">{error ? error : ""}</div>
          <div className="auth__tools">
            <Button
              disabled={userLoading}
              className="btn--dismiss"
              title="Back"
              onClick={handleBackFrom2FABtn}
            />
            <Button
              disabled={userLoading}
              className="btn--success"
              title="Submit"
              onClick={login2FAHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};
