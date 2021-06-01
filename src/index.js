import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Daily from "./Daily";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col h-screen w-full">
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
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
