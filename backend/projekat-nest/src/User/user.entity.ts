import { NotificationEntity } from 'src/Notification/notification.entity';
import { Role } from 'src/Roles/roles.enum';
import { TermEntity } from 'src/Term/term.entity';
import {Entity,Column, PrimaryGeneratedColumn, Unique, OneToMany} from 'typeorm'
@Entity('User',{name:'User'})
@Unique(['Email'])
@Unique(['Username'])
@Unique(['PhoneNumber'])
@Unique(['JMBG'])
export class UserEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    NameAndSurname:string;
    @Column()
    Email:string;
    @Column()
    Username:string;
    @Column()
    Password:string;
    @Column()
    PhoneNumber:string;
    @Column()
    DateOfBirth:Date;
    @Column()
    JMBG:string;
    @Column({default:false})
    Verified:boolean;
    @Column()
    rola:Role;

    
   @OneToMany(()=>TermEntity,term=>term.User)
    ListOfTerms:TermEntity[];

    @OneToMany(()=>NotificationEntity,not=>not.User)
    Notifications:NotificationEntity[];
}