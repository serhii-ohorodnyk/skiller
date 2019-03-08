import { normalize } from "polished";

import { createGlobalStyle } from "./styled";

const GlobalStyles = createGlobalStyle`
  ${normalize()};
  
  html, body, #root {
    height: 100%;
  };

  body {
    overflow-y: scroll;
    overscroll-behavior-y: none;
    background-color: ${({ theme }) => theme.global.colors["light-1"]};
    margin: 0;
  };
`;

export default GlobalStyles;
