import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { PedidoProducto } from './entities/pedidoproducto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pedido,Cliente,PedidoProducto])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
