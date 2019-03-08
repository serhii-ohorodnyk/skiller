import { Grommet, GrommetProps } from "grommet";
import React from "react";

import manifest from "app/public/manifest.json";
import { styled } from "./styled";

interface GrommetTheme {
  global: {
    colors: {
      brand: string;
      "light-1": string;
      "light-2": string;
      "light-3": string;
      "light-4": string;
      "light-5": string;
      "light-6": string;
      "dark-1": string;
      "dark-2": string;
      "dark-3": string;
      "dark-4": string;
      "dark-5": string;
      "dark-6": string;
      "accent-1": string;
      "accent-2": string;
      "accent-3": string;
      "accent-4": string;
      "neutral-1": string;
      "neutral-2": string;
      "neutral-3": string;
      "neutral-4": string;
      "status-critical";
      "status-error";
      "status-warning";
      "status-ok";
      "status-unknown";
      "status-disabled";
    };
  };
}

const theme: RecursivePartial<GrommetTheme> = {
  global: {
    colors: {
      brand: manifest.theme_color
    }
  }
  // button: {
  //   border: {
  //     color: manifest.theme_color,
  //   },
  //   color: '#fff',
  //   primary: { color: manifest.theme_color },
  // }
};

export type Theme = GrommetTheme;
export type AppThemeProps = Omit<GrommetProps, "theme">;

const StyledGrommet = styled(Grommet)`
  height: 100%;
`;

const AppThemeProvider: React.FC<AppThemeProps> = props => (
  <StyledGrommet {...props} theme={theme as any} />
);

export default AppThemeProvider;
