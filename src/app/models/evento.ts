export interface Usuario {
    id: number;
    nombre?: string;
    correoElectronico?: string;
}

export interface Evento {
    id: number;
    nombre?: string;
    descripcion?: string;
    fechaHora: Date;
    ubicacion?: string;
    capacidadMaxima: number;
    asistentes?: number;
    usuario: Usuario;
}