// src/app/producto/dto/create-producto.dto.ts
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  precio?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsInt()
  formularioId?: number;
}
