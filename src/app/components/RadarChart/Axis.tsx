import styled from "styled-components";

import { Column, Point } from "./types";
import { polarToX, polarToY } from "./utils";

const mapPoints = (points: Point[]) => {
  return points
    .map(point => point[0].toFixed(4) + "," + point[1].toFixed(4))
    .join(" ");
};

export interface AxisProps {
  chartSize: number;
  col: Column;
}

const Axis = styled(styled.polyline<AxisProps>``).attrs<AxisProps>(
  ({ col, chartSize }) => ({
    points: mapPoints([
      [0, 0],
      [polarToX(col.angle, chartSize / 2), polarToY(col.angle, chartSize / 2)]
    ])
  })
)`
  stroke: #555;
  stroke-width: 0.2;
`;

export default Axis;
