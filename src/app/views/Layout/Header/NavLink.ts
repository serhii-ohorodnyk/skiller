import { NavLink as ReactNavLink } from "react-router-dom";

import { styled } from "app/styles";

const NavLink = styled(ReactNavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.global.colors.text.light};
  padding: ${({ theme }) => theme.global.edgeSize.small};
  border-bottom: ${({ theme }) =>
    `transparent ${theme.global.edgeSize.xxsmall} solid`};
`;

export default NavLink;
