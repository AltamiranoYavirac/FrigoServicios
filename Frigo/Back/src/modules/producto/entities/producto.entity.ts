// src/modules/producto/entities/producto.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { formulario } from '../../formulario/entities/formulario.entity';
  import { PedidoProducto } from '../../pedido/entities/pedidoproducto.entity';
  
  @Entity('productos')
  export class Producto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    precio: number;
  
    @Column('int', { default: 0 })
    stock: number;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string | null;
  
    @ManyToOne(() => formulario, c => c.producto, {
      nullable: true,
      onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'formularioId' })
    formulario: formulario | null;
  
    @Column({ type: 'int', nullable: true })
    formularioId: number | null;
  
    @OneToMany(() => PedidoProducto, pp => pp.producto)
    pedidoProductos: PedidoProducto[];
  }
  