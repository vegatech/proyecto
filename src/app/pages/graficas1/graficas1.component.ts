import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: ['./graficas1.component.css']
})
export class Graficas1Component implements OnInit {
    // Doughnut
    public doughnutChartLabels: Label[] = ['Ventas por entrega', 'Ventas en Tienda', 'Ventas por Email'];
    public doughnutChartData: MultiDataSet = [
      [350, 450, 100],
      [50, 150, 120],
      [250, 130, 70],
    ];
    public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
