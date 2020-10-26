import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { CardsPage } from "./pages/CardsPage";
import { SingleCardPage } from "./pages/SingleCardPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/cards" component={CardsPage} />
        <Route exact path="/card/:id" component={SingleCardPage} />
        <Redirect to="/cards" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/auth" component={AuthPage}></Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
};
