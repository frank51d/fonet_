import { Time } from '@angular/common';

export interface ordenServicio {
    idestatus_orden: number,
    idtipo_orden: number,
    id: number,
    nombres_cliente: string,
    telefono_cliente: string,
    movil_cliente: string,
    direccion_cliente: string,
    ppp_user: string,
    ppp_pass: string,
    idtipo_falla: number,
    fecha_report: Date,
    fecha_asig: Date,
    fecha_ejecucion: Date,
    hora_inicio: Time,
    hora_fin: Time,
    diagnostico_inicial: string,
    diagnostico_final: string
}