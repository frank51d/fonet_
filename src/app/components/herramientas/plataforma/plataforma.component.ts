import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialesService } from '../../../services/materiales.service';
import { Plataforma } from 'src/app/models/plataforma';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {

  plataformas: any = [];

  plataforma : any = {
    descripcion: '',
    direccion: '',
    coordenada: ''
  }

  constructor(
    private _materialesServicio : MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute
  ) { }

  ngOnInit() {
    this._materialesServicio.getPlataformas().subscribe(
      res => {
        this.plataformas = res
      },
      err => console.log(err)
    )
  }

  crearPlataforma(){
    this._materialesServicio.savePlataforma(this.plataforma).subscribe(
      res => {
        console.log(res)
        this.ngOnInit()
      },
      err => console.error(err)
    )
  }

}
