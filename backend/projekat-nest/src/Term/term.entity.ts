import { BorderCrossEntity } from "src/BorderCross/border.cross.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Passenger } from "./passenger.interface";
import { NotificationEntity } from "src/Notification/notification.entity";

@Entity('Term',{name:'Term'})
export class TermEntity{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    NumOfPassangers:number;
    @Column({type:'jsonb',nullable:true,transformer:{to:(value)=>value,from:(value)=>value as Passenger[]}})
    PassangerList:Passenger[];
    @Column()
    CarBrand:string;
    @Column()
    NumOfRegistrationPlates:string;
    @Column()
    ChassisNumber:string;
    @Column()
    NumberOfDays:number;
    @Column()
    PlaceOfResidence:string;
    @Column()
    DateAndTime:Date;
    @Column({default:false})
    IsPaid:Boolean;
    @Column({default:false})
    IsCrossed:Boolean;
    @Column({default:false})
    IsComeBack:Boolean;
    @Column()
    Irregularities:string|null;
    @Column({default:false})
    Accepted:Boolean;

    @ManyToOne(()=>UserEntity,user=>user.ListOfTerms)
    User:UserEntity;

    @ManyToOne(()=>BorderCrossEntity,borderCross=>borderCross.ListOfTerms)
    BorderCross:BorderCrossEntity;
    
    @OneToMany(()=>NotificationEntity, not=>not.Term)
    ListNotifications:NotificationEntity[];

}