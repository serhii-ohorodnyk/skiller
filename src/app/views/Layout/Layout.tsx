import React from "react";
import { hot } from "react-hot-loader/root";
import { ThemeProps } from "styled-components";

import AppIcon from "app/components/AppIcon";
import { Theme, withTheme } from "app/styles";
import { LayoutContainer } from "./styles";

const Layout: React.FC<ThemeProps<Theme>> = ({ theme }) => (
  <LayoutContainer>
    <h1>Skiller</h1>
    <AppIcon fill={theme.colors.primary} />
  </LayoutContainer>
);

export default hot(withTheme(Layout));
