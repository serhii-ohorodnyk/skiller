import { loadableReady } from "@loadable/component";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "app/App";
import { AppThemeProvider } from "app/styles";
import registerServiceWorker from "./registerServiceWorker";

const render = () => {
  registerServiceWorker();

  loadableReady(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <AppThemeProvider userAgent={navigator.userAgent}>
          <App />
        </AppThemeProvider>
      </BrowserRouter>,
      document.getElementById("root")
    );
  });
};

export default render;
