import { Box, BoxProps } from "grommet";
import React from "react";
import styled, { css } from "styled-components";

import { headerHeightPx } from "./const";

const hideGlobalHeaderStyle = (heightPx: number) => css`
  transform: translateY(-${heightPx}px);
`;

const Header: React.FC<Omit<BoxProps, "as">> = props => (
  <Box as="header" {...props} />
);
const StickyContainer = styled(Header)<{ hideGlobalHeader: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition-property: transform;
  transition-duration: 0.2s;

  ${p => p.hideGlobalHeader && hideGlobalHeaderStyle(headerHeightPx.global)};
`;

export default StickyContainer;
