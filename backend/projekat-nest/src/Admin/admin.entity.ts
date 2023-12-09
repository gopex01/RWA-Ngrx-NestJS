import { Role } from "src/Roles/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Admin',{name:'Administrator'})
export class AdminEntity{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Username:string;
    @Column()
    Password:string;
    @Column()
    rola:Role;
}