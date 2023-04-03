import { Injectable } from '@angular/core';
import {
  HeatMapDataItemInterface,
  HeatMap_Groups,
  HeatMap_Variables,
} from './random';

@Injectable({
  providedIn: 'root',
})
export class ChartsDataService {
  data = [
    { name: '2023-04-01', value: 358 },
    { name: '2023-03-31', value: 225 },
    { name: '2023-03-30', value: 333 },
    { name: '2023-03-27', value: 3 },
    { name: '2023-03-26', value: 22 },
    { name: '2023-03-25', value: 29 },
    { name: '2023-03-24', value: 162 },
    { name: '2023-03-22', value: 76 },
    { name: '2023-03-21', value: 34 },
    { name: '2023-03-20', value: 7 },
    { name: '2023-03-19', value: 184 },
    { name: '2023-03-18', value: 276 },
    { name: '2023-03-17', value: 119 },
    { name: '2023-03-16', value: 172 },
    { name: '2023-03-15', value: 205 },
    { name: '2023-03-14', value: 187 },
    { name: '2023-03-13', value: 81 },
    { name: '2023-03-12', value: 159 },
    { name: '2023-03-11', value: 360 },
  ];

  private generateRandomValue(start: number, end: number) {
    return Math.ceil(Math.random() * (end - start) + start);
  }

  getHeatMapData(): HeatMapDataItemInterface[] {
    const samples: HeatMapDataItemInterface[] = [];
    const groups = Object.values(HeatMap_Groups);
    const variables = Object.values(HeatMap_Variables);
    groups.forEach((g) => {
      variables.forEach((v) => {
        const val = this.generateRandomValue(1, 100);
        samples.push({
          group: g,
          variable: v,
          value: val,
        });
      });
    });
    return samples;
  }
}
