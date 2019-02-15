import { createGlobalStyle } from "./styled";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
  };

  body {
    overflow-y: scroll;
    overscroll-behavior-y: none;
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0;
  };
`;

export default GlobalStyles;
