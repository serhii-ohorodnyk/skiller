import React from "react";
import { ThemeProvider } from "./styled";

const theme = {
  colors: {
    background: "#fafafa",
    primary: "#008281"
  }
};

export type Theme = typeof theme;

interface AppThemeProviderProps {
  children: React.ReactChild;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppThemeProvider;
