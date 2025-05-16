import { Controller, Post, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async crear(@Body() ticket: any) {
    return await this.ticketsService.enviarCorreo(ticket);
  }
}
