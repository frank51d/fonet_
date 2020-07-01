import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MaterialesService } from '../../../services/materiales.service';
import { ComunService } from '../../../services/comun.service';
import { ClientesService } from '../../../services/clientes.service'; 
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})

@Injectable()
export class AjustesComponent implements OnInit, CanActivate {

  URL : string = "";
  token: string = "";

  constructor(
    private _comun: ComunService,
    private _mkw: ClientesService,
    private tokenService: TokenService,
    private router: Router,
    private _servicio: MaterialesService
  ) { }

  canActivate() {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.URL = this._mkw.url;
    this.token = this._comun.tokenMkw;
  }

}
