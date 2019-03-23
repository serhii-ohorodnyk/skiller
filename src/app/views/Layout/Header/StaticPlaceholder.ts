import styled from "styled-components";

import { headerHeightPx } from "./const";

const StaticPlaceholder = styled.div`
  height: ${headerHeightPx.global + headerHeightPx.nav}px;
`;

export default StaticPlaceholder;
