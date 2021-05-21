import { Grommet,Main } from "grommet";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Daily from "./Daily";
import { grommet } from "grommet/themes";
ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={grommet} full>
    <Main pad="small" fill align="center">
      <Router>
        <Switch>
          <Route exact path="/daily">
            <Daily />
          </Route>
          <Route path="/">
            <h1>HELLO WORLD</h1>
          </Route>
        </Switch>
      </Router>
      </Main>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
