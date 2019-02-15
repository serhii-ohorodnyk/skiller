import React from "react";
import Helmet from "react-helmet";

import { AppThemeProvider, GlobalStyles } from "./styles";
import Layout from "./views/Layout";

const App: React.FC = () => (
  <AppThemeProvider>
    <>
      <GlobalStyles />
      <Helmet>
        <title>Skiller</title>
      </Helmet>
      <Layout />
    </>
  </AppThemeProvider>
);

export default App;
