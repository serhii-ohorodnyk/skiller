import { styled } from "app/styles";
import { headerHeightPx } from "./const";

const StaticPlaceholder = styled.div`
  height: ${headerHeightPx.global + headerHeightPx.nav}px;
`;

export default StaticPlaceholder;
