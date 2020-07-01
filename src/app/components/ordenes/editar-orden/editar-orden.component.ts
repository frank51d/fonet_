import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialesService } from '../../../services/materiales.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  
  date_asig: Date;
  date_rep: Date;
  date_eje: Date;
  usuarios: any = [];
  tipoOrdenes: any = [];
  ordenServicio :any = []

  constructor(
    private _servicio: MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute,
    private _dates: DatePipe,
    private _location: Location
  ) { }

  ngOnInit() {
    const params = this.activedRouter.snapshot.params;
    if(params.id){
      this._servicio.getOneOrder(params.id).subscribe(
        res => {
          console.log(res),
          this.ordenServicio = res
          this.covert();
        },
        err => console.error(err)
      )
    }
    this._servicio.getUsuarios().subscribe(
      res => {
        this.usuarios = res
      },
      err => console.error(err)
    );
    this._servicio.getTipoOrden().subscribe(
      res => {
        this.tipoOrdenes = res
      },
      err => console.log(err)
    );
  }

  editOrden(){
    delete this.ordenServicio.estatus;
    delete this.ordenServicio.tipo_orden;
    if (this.ordenServicio.idestatus_orden==4) {
      if(this.ordenServicio.id==0 || this.ordenServicio.id==1){
        this.ordenServicio.idestatus_orden=4;
        this._servicio.updateOrden(this.ordenServicio.idorden, this.ordenServicio).subscribe(
          res => {
            console.log(res)
          },
          err => console.error(err)
        )
      }else{
        this.ordenServicio.idestatus_orden=1;
        this._servicio.updateOrden(this.ordenServicio.idorden, this.ordenServicio).subscribe(
          res => {
            console.log(res)
          },
          err => console.error(err)
        )
      }
    }else{
      if(this.ordenServicio.id==0 || this.ordenServicio.id==1){
        this.ordenServicio.idestatus_orden=4;
        this._servicio.updateOrden(this.ordenServicio.idorden, this.ordenServicio).subscribe(
          res => {
            console.log(res)
          },
          err => console.error(err)
        )
      }else{
        this._servicio.updateOrden(this.ordenServicio.idorden, this.ordenServicio).subscribe(
          res => {
            console.log(res)
          },
          err => console.error(err)
        )
      }
    }
    alert('Orden actualizada!');
    this.route.navigate(['/ordenes/listar']);
  }

  covert(){
    this.date_asig = this.ordenServicio.fecha_asig
    this.date_rep = this.ordenServicio.fecha_reporte
    if (this.ordenServicio.idestatus_orden==3) {
      this.date_eje = this.ordenServicio.fecha_ejecucion
      this.ordenServicio.fecha_ejecucion = this._dates.transform(this.date_eje, 'yyyy-MM-dd');
    }
    this.ordenServicio.fecha_asig = this._dates.transform(this.date_asig, 'yyyy-MM-dd');
    this.ordenServicio.fecha_reporte = this._dates.transform(this.date_rep, 'yyyy-MM-dd');
  }

  goB(){
    this._location.back();
  }

}
