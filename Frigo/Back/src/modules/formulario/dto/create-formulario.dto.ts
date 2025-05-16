export class CreateFormularioDto {
    fecha: Date;  // Se espera que sea un string, que luego convertimos a Date
    horaIngreso?: string;   // formato "HH:mm:ss"
    horaSalida?: string;    // formato "HH:mm:ss"
    area: string;
    marca: string;
    modelo: string;
    serie: string;
    tipo: string;
    capacidad: string;
    refrig:string;
    psi: string;
    volts: string;
    amp: string; 


    descripcion: string;
    cantidad: number;  // Se espera que sea un string para poder convertirlo a number
    materiales: string;
    recomendado: string;
  }
