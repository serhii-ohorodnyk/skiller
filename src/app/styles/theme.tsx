import { Grommet, GrommetProps, GrommetTheme } from "grommet";
import React from "react";
import styled from "styled-components";

import manifest from "app/public/manifest.json";

export interface AppTheme extends GrommetTheme {
  radar: {
    scaleColors: string[];
  };
}

const theme: RecursivePartial<AppTheme> = {
  global: {
    colors: {
      brand: manifest.theme_color
    }
  },
  radar: {
    scaleColors: ["#00873D", "#3D138D", "#00739D", "#A2423D"]
  }
};

const StyledGrommet = styled(Grommet)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export type AppThemeProviderProps = Omit<GrommetProps, "theme">;

const AppThemeProvider: React.FC<AppThemeProviderProps> = props => (
  <StyledGrommet {...props} theme={theme as AppTheme} />
);

export default AppThemeProvider;
