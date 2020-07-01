export interface ClienteMkW {
    estado: string,
    datos:[
        {
            id: number,
            nombre: string,
            estado: string,
            correo: string,
            telefono: string,
            movil: string,
            cedula: string,
            pasarela: string,
            codigo: string,
            direccion_principal: string,
            servicios: [
                {
                    id: number,
                    idperfil: number,
                    nodo: string,
                    costo: number,
                    ipap: string,
                    mac: string,
                    ip: string,
                    instalado: Date,
                    pppuser: string,
                    ppppass: string,
                    tiposervicio: string,
                    status_user: string,
                    coordenadas: string,
                    direccion: string,
                    snmp_comunidad: string,
                    perfil: string
                }
            ],
            facturacion: {
                facturas_nopagadas: number,
                total_facturas: number
            }
        }
    ]

}