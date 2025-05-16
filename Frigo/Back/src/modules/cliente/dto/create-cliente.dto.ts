import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  telefono: string;

  @IsOptional()
  direccion?: string;

  @IsNotEmpty()
  descripcion: string;
}
