import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as XLSX from 'xlsx';
import { Key } from 'protractor';


@Component({
  selector: 'app-reporte-det',
  templateUrl: './reporte-det.component.html',
  styleUrls: ['./reporte-det.component.css']
})
export class ReporteDetComponent implements OnInit {

  chart1: Chart;
  vals_char1: any = [];
  labels_char1: any = [];

  chart2: Chart;
  vals_char2: any = [];
  labels_char2: any = [];

  chart3: Chart;
  vals_char3: any = [];
  labels_char3: any = [];
  labels2_char3: any = [];

  chart4: Chart;
  vals_char4: any = [];
  labels_char4: any = [];

  count_by_status: any = [];
  count_by_tipo: any = [];
  count_by_status_tec: any = [];
  count_by_tipo_tec: any = [];
  count_sd_tec: any = [];
  count_2d_tec: any = [];
  count_3d_tec: any = [];

  total_by_status: number = 0;
  percent_by_status: any = [];

  total_by_tipo: number = 0;
  percent_by_tipo: any = [];

  total_by_status_tec: number = 0;
  percent_by_status_tec: any = [];

  total_by_tipo_tec: number = 0;
  percent_by_tipo_tec: any = [];

  fill: any = {
    start_date: null,
    end_date: null
  }

  avg: any = {};

  constructor(
    private _servicio: MaterialesService
  ) { }

  ngOnInit() {
    this._servicio.getReportAllByStatus(this.fill).subscribe(
      res => {
        this.count_by_status = res;
      },
      err => console.log(err)
    );
    this._servicio.getReportAllByTipo(this.fill).subscribe(
      res => {
        this.count_by_tipo = res;
      },
      err => console.log(err)
    )
    this._servicio.getReportAllByStatusTec(this.fill).subscribe(
      res => {
        this.count_by_status_tec = res;
      },
      err => console.log(err)
    )
    this._servicio.getReportAllByTipoTec(this.fill).subscribe(
      res => {
        this.count_by_tipo_tec = res;
      },
      err => console.log(err)
    )
    this._servicio.getReportAllSameDay(this.fill).subscribe(
      res => {
        this.count_sd_tec = res;
      },
      err => console.log(err)
    )
    this._servicio.getReportAll2ndDay(this.fill).subscribe(
      res => {
        this.count_2d_tec = res;
      },
      err => console.log(err)
    )
    this._servicio.getReportAll3rdDay(this.fill).subscribe(
      res => {
        this.count_3d_tec = res;
        this.totales();
      },
      err => console.log(err)
    )
    this._servicio.getAVG().subscribe(
      res => {
        this.avg = res
      },
      err => console.log(err)
    )
    if (this.chart1 == undefined) {
      this.chart1 = new Chart('canvas1', {
        type: 'horizontalBar',
        plugins: [ChartDataLabels],
        data: {
          labels: [],
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
              '#42FFC4'],
            data: []
          }]
        },
        options: {
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: '#FFFFFF',
              font: {
                weight: 'bold'
              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: 'TOTAL DE ÓRDENES POR ESTATUS'
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
    } else {
      this.chart1.update();
    }
    if (this.chart2 == undefined) {
      this.chart2 = new Chart('canvas2', {
        type: 'horizontalBar',
        plugins: [ChartDataLabels],
        data: {
          labels: [],
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
              '#42FFC4'],
            data: []
          }]
        },
        options: {
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: '#FFFFFF',
              font: {
                weight: 'bold'
              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: 'TOTAL DE ÓRDENES POR TIPO'
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
    } else {
      this.chart2.update();
    }
    if (this.chart3 == undefined) {
      this.chart3 = new Chart('canvas3', {
        type: 'radar',
        plugins: [ChartDataLabels],
        data: {
          labels: [],
          datasets: []
        },
        options: {
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: '#FFFFFF',
              font: {
                weight: 'bold'
              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: 'TOTAL DE ÓRDENES POR TIPO'
          }
          
        }
      });
    } else {
      this.chart3.update();
    }
    if (this.chart4 == undefined) {
      this.chart4 = new Chart('canvas4', {
        type: 'radar',
        plugins: [ChartDataLabels],
        data: {
          labels: [],
          datasets: []
        },
        options: {
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: '#FFFFFF',
              font: {
                weight: 'bold'
              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: 'TOTAL DE ÓRDENES POR ESTASTUS'
          }
          
        }
      });
    } else {
      this.chart4.update();
    }
  }

  totales() {
    //datos chart1
    this.vals_char1 = []
    this.labels_char1 = []
    //datos chart2
    this.vals_char2 = []
    this.labels_char2 = []
    //datos chart3
    this.vals_char3 = [];
    this.labels_char3 = []

    this.total_by_status = 0
    this.percent_by_status = []
    this.total_by_tipo = 0
    this.percent_by_tipo = []

    for (let i = 0; i < this.count_by_status.length; i++) {
      this.total_by_status = this.count_by_status[i].cantidad + this.total_by_status
      this.vals_char1[i] = this.count_by_status[i].cantidad
      this.labels_char1[i] = this.count_by_status[i].tipo_orden
    }
    for (let i = 0; i < this.count_by_status.length; i++) {
      this.percent_by_status[i] = this.count_by_status[i].cantidad / this.total_by_status * 100
    }

    for (let i = 0; i < this.count_by_tipo.length; i++) {
      this.total_by_tipo = this.count_by_tipo[i].cantidad + this.total_by_tipo
      this.vals_char2[i] = this.count_by_tipo[i].cantidad
      this.labels_char2[i] = this.count_by_tipo[i].descripcion
    }
    for (let i = 0; i < this.count_by_tipo.length; i++) {
      this.percent_by_tipo[i] = this.count_by_tipo[i].cantidad / this.total_by_tipo * 100
    }

    // for (let i = 0; i < this.count_by_tipo_tec.length; i++) {
    //   this.vals_char3[i] = []
    //   for (let k = 0; k < this.count_by_tipo_tec.length; k++) {
    //     if (this.count_by_tipo_tec.length - i == this.count_by_tipo_tec.length) {
    //       console.log(i, this.count_by_tipo_tec
    //       [i].tipo_orden, this.count_by_tipo_tec[i].cantidad)
    //       this.vals_char3[i][k] = this.count_by_tipo_tec[i].cantidad
    //       this.labels_char3[i] = this.count_by_tipo_tec[k].nombre
    //     } else {
    //       if (this.count_by_tipo_tec.length - i == 1) {
    //         console.log(i, this.count_by_tipo_tec
    //         [i].tipo_orden, this.count_by_tipo_tec[i].cantidad)
    //         this.vals_char3[i][k] = this.count_by_tipo_tec[i].cantidad
    //         this.labels_char3[i] = this.count_by_tipo_tec[k].nombre
    //       } else {
    //         if (this.count_by_tipo_tec[k].tipo_orden == this.count_by_tipo_tec[k + 1].tipo_orden) {
    //           console.log(i, this.count_by_tipo_tec
    //           [i].tipo_orden, this.count_by_tipo_tec[i].cantidad)
    //           this.labels_char3[i] = this.count_by_tipo_tec[i].nombre
    //           this.vals_char3[i][k] = this.count_by_tipo_tec[k].cantidad
    //         } else {
    //           if (this.count_by_tipo_tec[k].tipo_orden == this.count_by_tipo_tec[k - 1].tipo_orden) {
    //             console.log(i, this.count_by_tipo_tec
    //             [i].tipo_orden, this.count_by_tipo_tec[i].cantidad)
    //             this.labels_char3[i] = this.count_by_tipo_tec[i].nombre
    //             this.vals_char3[i][k] = this.count_by_tipo_tec[k].cantidad
    //           }
    //           console.log('------')
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }

    for (let i = 0; i < this.count_by_tipo_tec.length; i++) {
      for (let j = 0; j < this.count_by_tipo_tec.length; j++) {
        if(0){

        }
      }
    }

    // for (let i = 0; i < this.count_by_tipo_tec.length; i++) {
    //   this.chart3.data.datasets[i] = {
    //     label: 'A',
    //     barPercentage: 1,
    //     barThickness: 10,
    //     maxBarThickness: 10,
    //     minBarLength: 2,
    //     backgroundColor: [
    //       'rgba(182, 215, 215, 0.66)',
    //       'rgba(182, 215, 215, 0.66)',
    //       'rgba(206, 139, 141, 0.66)',],
    //     data: []
    //   }
    //   // this.chart3.data.datasets[i].label = this.count_by_tipo_tec[i].nombre.concat(i);
    //   // this.chart3.data.datasets[i].data = this.vals_char3[i]
    //   //this.chart3.data.datasets[i].data = this.count_by_tipo_tec[i].cantidad;
    // }

    this.chart1.data.datasets[0].data = this.vals_char1;
    this.chart1.data.labels = this.labels_char1
    this.chart1.update();
    this.chart2.data.datasets[0].data = this.vals_char2;
    this.chart2.data.labels = this.labels_char2
    this.chart2.update();
    this.chart3.data.labels = this.labels_char2
    this.chart3.update();
    this.chart4.data.labels = this.labels_char1
    this.chart4.update();
  }

  filtrar() {
    this.ngOnInit();
  }

  refresh() {
    this.fill.start_date = null
    this.fill.end_date = null
    this.filtrar();
  }

  doExcel1(tableId1, tableId2, tableId3) {

    let targetTableElm1 = document.getElementById(tableId1);
    let targetTableElm2 = document.getElementById(tableId2);
    let targetTableElm3 = document.getElementById(tableId3);

    const wb = { SheetNames: [], Sheets: {} };
    var ws1 = XLSX.utils.table_to_book(targetTableElm1).Sheets.Sheet1;
    wb.SheetNames.push("Sheet1"); wb.Sheets["Sheet1"] = ws1;

    var ws2 = XLSX.utils.table_to_book(targetTableElm2).Sheets.Sheet1;
    wb.SheetNames.push("Sheet2"); wb.Sheets["Sheet2"] = ws2;

    var ws3 = XLSX.utils.table_to_book(targetTableElm3).Sheets.Sheet1;
    wb.SheetNames.push("Sheet3"); wb.Sheets["Sheet3"] = ws3;
    console.log(ws1); console.log(ws2); console.log(ws3); console.log(wb);
    const blob = new Blob([this.s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: "application/octet-stream"
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'demo.xlsx';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  convert() {
    let tbl1 = document.getElementsByTagName("table")[0]
    let tbl2 = document.getElementsByTagName("table")[1]
    let tbl3 = document.getElementsByTagName("table")[2]
    let tbl4 = document.getElementsByTagName("table")[3]
    let tbl5 = document.getElementsByTagName("table")[4]
    let tbl6 = document.getElementsByTagName("table")[5]
    let tbl7 = document.getElementsByTagName("table")[6]

    let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
    let worksheet_tmp2 = XLSX.utils.table_to_sheet(tbl2);
    let worksheet_tmp3 = XLSX.utils.table_to_sheet(tbl3);
    let worksheet_tmp4 = XLSX.utils.table_to_sheet(tbl4);
    let worksheet_tmp5 = XLSX.utils.table_to_sheet(tbl5);
    let worksheet_tmp6 = XLSX.utils.table_to_sheet(tbl6);
    let worksheet_tmp7 = XLSX.utils.table_to_sheet(tbl7);

    let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 })
    let b = XLSX.utils.sheet_to_json(worksheet_tmp2, { header: 1 })
    let c = XLSX.utils.sheet_to_json(worksheet_tmp3, { header: 1 })
    let d = XLSX.utils.sheet_to_json(worksheet_tmp4, { header: 1 })
    let e = XLSX.utils.sheet_to_json(worksheet_tmp5, { header: 1 })
    let f = XLSX.utils.sheet_to_json(worksheet_tmp6, { header: 1 })
    let g = XLSX.utils.sheet_to_json(worksheet_tmp7, { header: 1 })

    a = a.concat(['']).concat(b).concat(['']).concat(c).concat(['']).concat(d).concat(['']).concat(e).concat(['']).concat(f).concat(['']).concat(g)

    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'detallado.xls')
  }

}
