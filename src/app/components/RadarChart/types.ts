export type Point = [number, number];

export interface Column {
  key: React.ReactText;
  angle: number;
}

export interface DataItem {
  [key: string]: number;
}
