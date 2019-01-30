import {Component, Input} from '@angular/core';

@Component({
  selector: 'bk-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.sass']
})
export class HistoryChartComponent {
  @Input() data;
  view: any[] = [735, 470];
  constructor() { }

}
