import { Role } from "../../common/enums/rol.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length:50})
    name:string;

    @Column({type:'varchar', length:225, unique: true})
    email:string;

    @Column({type:'varchar', length:200})
    password:string;

    @Column({type: 'enum', enum: Role, default: Role.CLIENT,})
    role: Role
}
