import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  creado_en: Date;
}
