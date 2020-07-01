import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Consulta } from '../consulta';
import { retry, catchError } from 'rxjs/operators';
import { } from 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  httpOptions= {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  }

  url:string = 'http://mi.fonet.com.ve/api/v1/GetClientsDetails';

  constructor(private http:HttpClient) {

    console.log('funcionando servicio!');

  }

  getCliente(postD: Consulta){
    return this.http.post(this.url,postD,this.httpOptions);
  }
  

}
