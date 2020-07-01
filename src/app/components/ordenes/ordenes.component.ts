import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Consulta } from './../../consulta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  data: string;
  postData: Consulta;

  constructor(private _servicio: ClientesService){

  }

  ngOnInit() {
    
  }

  sendId(){

    this.postData = new Consulta();
    this.postData.token = 'eURGUHVuY2ZSbWkweXNXbVlVT0pZZz09';
    this.postData.idcliente = 1753;

    this._servicio.getCliente(this.postData).subscribe(data =>{
      console.log(data);
    });
    
  }

  
}
