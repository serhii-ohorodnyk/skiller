import { Box } from "grommet";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

import OfflineBanner from "app/components/OfflineBanner";
import routes from "app/routes";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Box as="main" flex="grow">
        <Switch>
          {Object.keys(routes).map(key => (
            <Route key={key} {...routes[key]} />
          ))}
        </Switch>
      </Box>
      <OfflineBanner />
    </>
  );
};

export default hot(Layout);
