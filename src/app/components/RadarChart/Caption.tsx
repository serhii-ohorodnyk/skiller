import styled from "styled-components";

import { Column } from "./types";
import { polarToX, polarToY } from "./utils";

export interface CaptionProps {
  size: number;
  col: Column;
}

const Caption = styled(styled.text<CaptionProps>``).attrs<CaptionProps>(
  ({ size, col }) => ({
    dy: 10 / 2,
    x: polarToX(col.angle, (size / 2) * 0.95).toFixed(4),
    y: polarToY(col.angle, (size / 2) * 0.95).toFixed(4)
  })
)`
  fill: #444;
  font-weight: 400;
  text-anchor: middle;
  text-shadow: 1px 1px 0 #fff;
`;

export default Caption;
