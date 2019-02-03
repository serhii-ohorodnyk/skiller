import { loadableReady } from "@loadable/component";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "app/App";
import { registerServiceWorker } from "./sw";

const render = () => {
  loadableReady(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById("root")
    );

    registerServiceWorker();
  });
};

export default render;
