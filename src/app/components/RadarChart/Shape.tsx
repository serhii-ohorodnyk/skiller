import styled from "styled-components";

import { Column, DataItem, Point } from "./types";
import { polarToX, polarToY } from "./utils";

const pathDefinition = ({ columns, chartData, chartSize }: ShapeProps) => {
  const points: Point[] = columns.map(col => {
    const value = chartData[col.key];
    const tuple: Point = [
      polarToX(col.angle, value / 2) * chartSize,
      polarToY(col.angle, value / 2) * chartSize
    ];
    return tuple;
  });

  let d = "M" + points[0][0].toFixed(4) + "," + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += "L" + points[i][0].toFixed(4) + "," + points[i][1].toFixed(4);
  }
  return d + "z";
};

export interface ShapeProps {
  index: number;
  columns: Column[];
  chartSize: number;
  chartData: DataItem;
}

const Shape = styled(styled.path<ShapeProps>``).attrs<ShapeProps>(props => ({
  d: pathDefinition(props)
}))`
  stroke: ${p => p.theme.radar.scaleColors[p.index] || "#00873D"};
  fill: ${p => p.theme.radar.scaleColors[p.index] || "#00873D"};
  fill-opacity: 0.5;
`;

export default Shape;
