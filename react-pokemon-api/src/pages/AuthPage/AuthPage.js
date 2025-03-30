import React, { useContext, useEffect, useState } from "react";
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

  const loginHandler = async (e) => {
    e.preventDefault();
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

  const login2FAHandler = async (e) => {
    e.preventDefault();
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

  useEffect(() => !animation && requestAnimationFrame(() => document.querySelector('[data-autofocus]')?.focus()), [animation, error])

  return (
    <div className={`auth ${tempUserData ? "auth-2fa" : ""}`}>
      {(!tempUserData || animation || showHiddenElements) && (
         <form className="auth__wrapper auth__wrapper--login" inert={animation} aria-hidden={animation} onSubmit={loginHandler}>
          <div className="auth__inputs">
            <>
              <Input
                required
                data-autofocus
                disabled={userLoading}
                title="Email"
                value={email}
                type="email"
                onChange={setEmail}
              />
              <Input
                required
                disabled={userLoading}
                title="Password"
                value={password}
                type="password"
                onChange={setPassword}
              />
            </>
          </div>
          <div className="auth__error" aria-live="polite">{error ? error : ""}</div>
          <div className="auth__tools">
            <Button
              disabled={userLoading}
              className="btn--success"
              title="Submit"
              type="submit"
            />
          </div>
        </form>
      )}

      {(tempUserData || animation || showHiddenElements) && (
        <form className="auth__wrapper auth__wrapper--2fa" inert={animation} aria-hidden={animation} onSubmit={login2FAHandler}>
          <div className="auth__inputs">
            <Input
              required
              data-autofocus
              minLength={6}
              maxLength={6}
              disabled={userLoading}
              title="2FA Code"
              value={secondFA}
              onChange={setSecondFA}
            />
          </div>
          <div className="auth__error" aria-live="polite">{error ? error : ""}</div>
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
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};
