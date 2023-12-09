import { Role } from "src/Roles/roles.enum";
import { TermEntity } from "src/Term/term.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('BorderCross',{name:'Border cross'})
@Unique(['Name'])
export class BorderCrossEntity{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Name:string;
    @Column()
    Username:string;
    @Column()
    Password:string;
    @Column()
    Location:string;
    @Column()
    Country:string;
    @Column()
    Type:string;
    @Column()
    WorkHour:string;
    @Column()
    TransportConnections:string;
    @Column()
    Capacity:string;
    @Column()
    Email:string;
    @Column()
    PhoneNumber:string;
    @Column()
    Description:string;
    @Column()
    rola:Role;
    
    @OneToMany(()=>TermEntity,term=>term.BorderCross)
    ListOfTerms:TermEntity[];
}