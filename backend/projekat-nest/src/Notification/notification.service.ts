import { Inject, Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "./notification.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";
import { TermEntity } from "src/Term/term.entity";

@Injectable()
export class NotificationService{
    constructor(@InjectRepository(NotificationEntity)
        private notRepo:Repository<NotificationEntity>,
        @InjectRepository(UserEntity)
        private userRepo:Repository<UserEntity>,
        @InjectRepository(TermEntity)
        private termRepo:Repository<TermEntity>,
        private userService:UserService){}

    async addNotification(message:string,username:string,idTerm:number)
    {
        const term=await this.termRepo.findOne({where:{Id:idTerm}});
        const user:UserEntity=await this.userService.getOneUser(username);
        if(!user){
            return {
                message:'error'
            }
        }
        let newNot:NotificationEntity=new NotificationEntity();
        newNot.Content=message;
        newNot.DateAndTime=new Date();
        newNot.User=user;
        newNot.Term = term;
        await this.notRepo.save(newNot);
    }
    async readNotification(idNot:number)
    {
        const not:NotificationEntity=await this.notRepo.findOne({where:{Id:idNot}});
        not.IsRead=true;
        this.notRepo.save(not);
    }
    async getNotification(username:string)
    {
       const user=await this.userRepo.findOne({
        where:{Username:username},
        relations:{Notifications:true},
       });
      return user.Notifications.filter(not=>not.IsRead==false);
    }
}