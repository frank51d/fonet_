import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialesService } from '../../../services/materiales.service';

@Component({
  selector: 'app-tipo-orden',
  templateUrl: './tipo-orden.component.html',
  styleUrls: ['./tipo-orden.component.css']
})
export class TipoOrdenComponent implements OnInit {

  tipoOrden = [];

  constructor(private _servicio: MaterialesService) { }

  ngOnInit() {
    
  }

}
