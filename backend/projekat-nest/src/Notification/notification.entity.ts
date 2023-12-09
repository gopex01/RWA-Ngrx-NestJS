import { TermEntity } from "src/Term/term.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class NotificationEntity
{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Content:string;
    @Column({default:false})
    IsRead:Boolean;
    @Column()
    DateAndTime:Date;
    @ManyToOne(()=>UserEntity,user=>user.Notifications)
    User:UserEntity;

    @ManyToOne(()=>TermEntity,term=>term.ListNotifications)
    Term:TermEntity;
    
}