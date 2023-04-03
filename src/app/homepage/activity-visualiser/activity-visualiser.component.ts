import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-visualiser',
  templateUrl: './activity-visualiser.component.html',
  styleUrls: ['./activity-visualiser.component.scss'],
})
export class ActivityVisualiserComponent implements OnInit {
  data = [
    { date: '2023-04-01', value: 358 },
    { date: '2023-03-31', value: 225 },
    { date: '2023-03-30', value: 333 },
    { date: '2023-03-27', value: 3 },
    { date: '2023-03-26', value: 22 },
    { date: '2023-03-25', value: 29 },
    { date: '2023-03-24', value: 162 },
    { date: '2023-03-22', value: 76 },
    { date: '2023-03-21', value: 34 },
    { date: '2023-03-20', value: 7 },
    { date: '2023-03-19', value: 184 },
    { date: '2023-03-18', value: 276 },
    { date: '2023-03-17', value: 119 },
    { date: '2023-03-16', value: 172 },
    { date: '2023-03-15', value: 205 },
    { date: '2023-03-14', value: 187 },
    { date: '2023-03-13', value: 81 },
    { date: '2023-03-12', value: 159 },
    { date: '2023-03-11', value: 360 },
  ];

  ngOnInit(): void {}
}
