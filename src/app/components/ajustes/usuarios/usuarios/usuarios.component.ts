import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NuevoUsuario } from '../../../../models/nuevo-usuario';
import { MaterialesService  } from '../../../../services/materiales.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  selectedUser : any = [];
  usuarios: any = [];
  form: any = {};
  private usuario: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private _servicio : MaterialesService,
    private activedRouter : ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.activedRouter.snapshot.params;
    if(params.id){
      this._servicio.getUsuarioByID(params.id).subscribe(
        res => {
          console.log(res),
          this.selectedUser = res
        },
        err => console.error(err)
      )
    }

    this._servicio.getUsuarios().subscribe(
      res => {
        this.usuarios = res
        console.log(res)
      },
      err => console.error(err)
    )
  }

  onRegister() {
    this.usuario = new NuevoUsuario(this.form.nombre, this.form.nombreUsuario, this.form.email, this.form.password);
    this.authService.registro(this.usuario).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
    },
      (error: any) => {
        console.log(error.error.mensaje);
        this.errorMsg = error.error.mensaje;
        this.isRegister = false;
        this.isRegisterFail = true;
      }
    );
  }

}
