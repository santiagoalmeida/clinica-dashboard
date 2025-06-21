export interface Agenda {
    id: number;
    fecha: Date;
    paciente: string;
    doctor: string;
    motivo: string;
}

export interface ResponseData<T> {
    success: boolean;
    data: T;
    message?: string;
}