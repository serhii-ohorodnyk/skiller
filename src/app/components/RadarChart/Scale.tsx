import styled from "styled-components";

export interface ScaleProps {
  value: number;
  chartSize: number;
  numberOfScales: number;
}

const Scale = styled(styled.circle<ScaleProps>``).attrs<ScaleProps>(props => ({
  r: ((props.value / props.numberOfScales) * props.chartSize) / 2
}))`
  cx: 0;
  cy: 0;
  fill: ${props => props.theme.global.colors["light-1"]};
  stroke: ${props => props.theme.global.colors["dark-1"]};
  stroke-width: 0.2;
`;

export default Scale;
