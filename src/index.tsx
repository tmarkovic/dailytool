import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import reportWebVitals from "./reportWebVitals";
import Daily from "./daily/Daily";
import "./index.css";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
