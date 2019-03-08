import { Button } from "grommet";
import React from "react";
import { hot } from "react-hot-loader/root";

import { LayoutContainer, Logo } from "./styles";

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <h1>Skiller</h1>
      <Logo />
      <Button primary={true} label="Skiller" />
    </LayoutContainer>
  );
};

export default hot(Layout);
