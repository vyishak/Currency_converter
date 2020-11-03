import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./core/Home";
import "./App.css";

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);

export default MainRouter;
