export const HeatMap_ColorRange = [
  '#161b22',
  '#722f6d',
  '#c1378e',
  '#ff4fa1',
  '#ff86c8',
];

// export const HeatMap_ColorRange = [
//   '#161b22',
//   '#0e4429',
//   '#006d32',
//   '#26a641',
//   '#39d353',
// ];

export enum HeatMap_Groups {
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  December = 'Dec',
}

export enum HeatMap_Variables {
  Sunday = 'Su',
  Saturday = 'Sa',
  Friday = 'Fr',
  Thursday = 'Th',
  Wednesday = 'We',
  Tuesday = 'Tu',
  Monday = 'Mo',
}

export const HeatMap_DomainRange = [0, 70, 90, 100, 150];

export interface DataItemInterface {
  name: string;
  value: number;
  abs: number;
}

export interface HeatMapDataItemInterface {
  group: string;
  variable: string;
  value: number;
}
