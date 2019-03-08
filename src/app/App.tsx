import React from "react";
import Helmet from "react-helmet";

import { GlobalStyles } from "./styles";
import Layout from "./views/Layout";

const App: React.FC = () => (
  <>
    <GlobalStyles />
    <Helmet title="Skiller" />
    <Layout />
  </>
);

export default App;
