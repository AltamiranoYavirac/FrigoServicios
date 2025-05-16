import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async crear(@Body() ticket: any) {
    return await this.ticketsService.enviarCorreo(ticket);
  }

  @Get()
  async obtenerTodos(): Promise<Ticket[]> {
    return this.ticketsService.obtenerTodos();
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number): Promise<void> {
    return this.ticketsService.eliminar(id);
  }
}

