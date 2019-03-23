import React from "react";

import Axis from "./Axis";
import Caption from "./Caption";
import Scale from "./Scale";
import Shape from "./Shape";
import { Column, DataItem } from "./types";

export interface RadarChartProps {
  numberOfScales: number;
  size: number;
  zoomDistance: number;
  data: DataItem[];
}

const RadarChart: React.FC<RadarChartProps> = ({
  size,
  zoomDistance,
  data,
  numberOfScales
}) => {
  const chartSize = size / zoomDistance;

  const delta = (size / 2).toFixed(4);
  const captions = Object.keys(data[0]);
  const columns: Column[] = captions.map((key, i, all) => {
    return {
      angle: (Math.PI * 2 * i) / all.length,
      key
    };
  });
  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`-10 0 ${size + 20} ${size}`}
    >
      <g transform={`translate(${delta},${delta})`}>
        {Array(numberOfScales)
          .fill(1)
          .map((_, i) => (
            <Scale
              key={numberOfScales - i}
              value={numberOfScales - i}
              chartSize={chartSize}
              numberOfScales={numberOfScales}
            />
          ))}
        {columns.map((col, i) => (
          <Axis col={col} key={`axis-${col.key}-${i}`} chartSize={chartSize} />
        ))}
        {data.map((dataItem, i) => (
          <Shape
            index={i}
            key={`shape-${dataItem}-${i}`}
            chartData={dataItem}
            chartSize={chartSize}
            columns={columns}
          />
        ))}
        {columns.map((col, i) => (
          <Caption col={col} key={`caption-${col.key}-${i}`} size={size}>
            {col.key}
          </Caption>
        ))}
      </g>
    </svg>
  );
};

export default RadarChart;
