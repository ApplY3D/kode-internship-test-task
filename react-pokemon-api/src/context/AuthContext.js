import { createContext } from "react";
//используем контекст чтобы передавать авторизацию через хук useContext
function noop() {}

export const AuthContext = createContext({
  // login: noop(),
  // logout: noop(),
  // isAuthenticated: false,
  // user: null,
});
