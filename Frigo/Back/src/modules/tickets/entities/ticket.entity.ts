import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  asunto: string;

  @Column('text')
  mensaje: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
