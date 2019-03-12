import { Box, BoxProps } from "grommet";
import React from "react";

import { horizontalScrollerStyle, styled } from "app/styles";
import NavLink from "./NavLink";

const NavBox: React.FC<Omit<BoxProps, "as">> = props => (
  <Box as="nav" {...props} />
);
const ScrollableNavigation = styled(NavBox)`
  ${horizontalScrollerStyle()};

  ${NavLink}.active {
    color: ${({ theme }) => theme.global.colors.brand};
    border-color: ${({ theme }) => theme.global.colors.brand};
  }
`;

export default ScrollableNavigation;
