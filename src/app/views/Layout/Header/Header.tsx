import { Box, BoxProps, Heading, Text } from "grommet";
import React from "react";

import routes from "app/routes";
import { headerHeightPx } from "./const";
import Logo from "./Logo";
import NavigationContainer from "./NavigationContainer";
import NavLink from "./NavLink";
import ScrollableNavigation from "./ScrollableNavigation";
import StaticPlaceholder from "./StaticPlaceholder";
import StickyContainer from "./StickyContainer";
import useStickyHeader from "./useStickyHeader";

const bottomBorder: BoxProps["border"] = {
  color: "border",
  side: "bottom",
  size: "xsmall",
  style: "solid"
};

const stickyOffset = headerHeightPx.global + headerHeightPx.nav;

const Header: React.FC = () => {
  const sticky = useStickyHeader(stickyOffset);
  return (
    <>
      <StaticPlaceholder />
      <StickyContainer
        hideGlobalHeader={sticky}
        pad={{ horizontal: "medium" }}
        background="white"
        border={bottomBorder}
        overflow="hidden"
      >
        <Box
          direction="row"
          align="center"
          height={`${headerHeightPx.global}px`}
        >
          <Logo />
          <Heading level="3">Skiller</Heading>
        </Box>
        <NavigationContainer>
          <ScrollableNavigation direction="row" align="center">
            <NavLink
              aria-label="Profiles"
              exact={routes.profiles.exact}
              activeClassName="active"
              to={routes.profiles.path as string}
            >
              <Text size="small">Profiles</Text>
            </NavLink>
            <NavLink
              aria-label="Candidates"
              activeClassName="active"
              exact={routes.candidates.exact}
              to={routes.candidates.path as string}
            >
              <Text size="small">Candidates</Text>
            </NavLink>
          </ScrollableNavigation>
        </NavigationContainer>
      </StickyContainer>
    </>
  );
};

export default Header;
