import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  chart2: Chart;
  data: any = [];
  vals: any = [];
  tecnico: any = [];

  constructor(
    private _servicio: MaterialesService
  ) { }

  ngOnInit() {
    this._servicio.geByTecnico().subscribe((res:any)=>{
        this.data = res
        for (let i = 0; i < this.data.length; i++) {
          this.vals[i] = this.data[i].ordenes
        }
        for (let i = 0; i < this.data.length; i++) {
          this.tecnico[i] = this.data[i].tecnico
        }
        this.chart2.data.labels = this.tecnico
        this.chart2.data.datasets[0].data = this.vals
        this.chart2.update();
      });
    this.chart2 = new Chart('canvas2', {
      type: 'horizontalBar',
      data: {
        datasets: [{
          label: 'Órdenes',
          barPercentage: 1,
          barThickness: 60,
          maxBarThickness: 60,
          minBarLength: 2,
          backgroundColor: [
            '#4270FF',
            '#3C93E8',
            '#4ED5FF',
            '#3CE8E3',
            '#42FFC4',
            '#4683E8',
            '#596BFF',
            '#5E46E8',
            '#984DFF',
            '#884AE8',
            '#CA5EFF',
            '#DE4AE8']
          //data: [10, 20, 30, 40, 50, 60, 70]
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Órdenes de Servicio Por Mes'
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

}
