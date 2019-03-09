import { Button, Heading } from "grommet";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

import OfflineBanner from "app/components/OfflineBanner";
import { LayoutContainer, Logo } from "./styles";

const Asd = () => (
  <Link to="/">
    <Button primary={true} label="Home" />
  </Link>
);

const Home = () => (
  <Link to="/asd">
    <Button primary={true} label="Asd" />
  </Link>
);

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Heading level="1">Skiller</Heading>
      <Logo />
      <Switch>
        <Route path="/asd" component={Asd} />
        <Route component={Home} />
      </Switch>
      <OfflineBanner />
    </LayoutContainer>
  );
};

export default hot(Layout);
