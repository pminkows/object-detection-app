import React from "react";
import { render } from 'react-dom'
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./utilities/configureStore";
import history from "./utilities/history";
// eslint-disable-next-line
import socketChannel from "./Socket/channel";

import "typeface-roboto";
// import "./index.scss";
import App from "./App";

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
