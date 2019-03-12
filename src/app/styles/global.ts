import { normalize } from "polished";

import { createGlobalStyle } from "./styled";

const GlobalStyles = createGlobalStyle`
  ${normalize()};
  
  html, body, #root {
    height: 100%;
  };

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    overflow-y: scroll;
    overscroll-behavior-y: none;
    background-color: ${({ theme }) => theme.global.colors["light-2"]};
    margin: 0;
  };
`;

export default GlobalStyles;
