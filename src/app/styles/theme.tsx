import { Grommet, GrommetProps, GrommetTheme } from "grommet";
import React from "react";

import manifest from "app/public/manifest.json";
import { styled } from "./styled";

export type Theme = GrommetTheme;

const theme: RecursivePartial<Theme> = {
  global: {
    colors: {
      brand: manifest.theme_color
    }
  }
};

const StyledGrommet = styled(Grommet)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export type AppThemeProps = Omit<GrommetProps, "theme">;

const AppThemeProvider: React.FC<AppThemeProps> = props => (
  <StyledGrommet {...props} theme={theme as Theme} />
);

export default AppThemeProvider;
