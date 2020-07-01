import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialesService } from '../../services/materiales.service';
import { Material } from 'src/app/models/material';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  materiales: any = [];

  material : any = {
    descripcion : ''
  }

  constructor(
    private _materialesServicio : MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute
    ) { }

  ngOnInit() {

    const params = this.activedRouter.snapshot.params;
    if(params.id){
      this._materialesServicio.getMaterial(params.id).subscribe(
        res => {
          console.log(res),
          this.material = res
        },
        err => console.error(err)
      )
    }

    this._materialesServicio.getMateriales().subscribe(
      res => {
        this.materiales = res
      },
      err => console.error(err)
    );

  }

  crearMaterial(){
    this._materialesServicio.saveMaterial(this.material)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => console.error(err)
      );
  }

  deleteMaterial(id: number){
    this._materialesServicio.deleteMaterial(id)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => console.error(err)
      )
  }

  updateMaterial(){
    this._materialesServicio.updateMaterial(this.material.idmaterial, this.material)
      .subscribe(
        res => {
          console.log(res)
          this.ngOnInit();
        },
        err => console.error(err)
      )
  }

}
