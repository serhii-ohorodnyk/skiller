import { Box, RangeInput } from "grommet";
import React from "react";

import RadarChart from "app/components/RadarChart";
import useRect from "app/hooks/useRect";

const data = [
  { battery: 0.7, design: 1, useful: 0.9, speed: 0.67, weight: 0.8 },
  { battery: 0.6, design: 0.9, useful: 0.8, speed: 0.7, weight: 0.6 }
];

const Profiles: React.FC = () => {
  const [zoomDistance, setZoomDistance] = React.useState(1.3);
  const [numberOfScales, setNumberOfScales] = React.useState(3);
  const onChangeZoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoomDistance(parseFloat(event.target.value));
  };
  const onChangeScales = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfScales(parseInt(event.target.value, undefined));
  };

  const containerRef = React.useRef<HTMLElement>(null);
  const sizes = useRect(containerRef);

  return (
    <Box ref={containerRef as any} align="center" flex="grow" justify="around">
      <RadarChart
        data={data}
        numberOfScales={numberOfScales}
        size={!!sizes ? sizes.width : 0}
        zoomDistance={zoomDistance}
      />
      <RangeInput
        min={1.2}
        max={1.8}
        step={0.1}
        value={zoomDistance}
        onChange={onChangeZoom}
      />
      <RangeInput
        min={2}
        max={7}
        step={1}
        value={numberOfScales}
        onChange={onChangeScales}
      />
    </Box>
  );
};

export default Profiles;
