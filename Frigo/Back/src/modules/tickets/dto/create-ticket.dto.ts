// src/modules/tickets/dto/create-ticket.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  asunto: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
