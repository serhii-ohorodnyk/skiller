import React from "react";
import Helmet from "react-helmet";

import appIcon from "./appIcon.jpg";

const App: React.FC = () => (
  <div>
    <Helmet>
      <title>Skiller</title>
    </Helmet>
    <h1>Skiller</h1>
    <img src={appIcon} />
  </div>
);

export default App;
