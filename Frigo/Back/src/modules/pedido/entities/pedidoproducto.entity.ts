// src/modules/pedido/entities/pedidoproducto.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('pedido_producto')
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pedidoId: number;

  @Column()
  productoId: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Pedido, ped => ped.pedidoProductos, { nullable: true })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  @ManyToOne(() => Producto, prod => prod.pedidoProductos, { nullable: true })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;
}
