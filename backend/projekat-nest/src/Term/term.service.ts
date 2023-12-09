import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TermEntity } from "./term.entity";
import { Between, Repository } from "typeorm";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";
import { BorderCrossSerivce } from "src/BorderCross/border.cross.service";
import { BorderCrossEntity } from "src/BorderCross/border.cross.entity";
import { NotificationEntity } from "src/Notification/notification.entity";
import { NotificationService } from "src/Notification/notification.service";

@Injectable()
export class TermService{

    constructor(@InjectRepository(TermEntity) private termRepository:Repository<TermEntity>,
    private userService:UserService,
    private borderCrossService:BorderCrossSerivce,
    private notService:NotificationService,
   @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
   @InjectRepository(BorderCrossEntity) private bcRepo:Repository<BorderCrossEntity>,
   @InjectRepository(NotificationEntity) private notRepo:Repository<NotificationEntity>)
    {}

    async addTerm(input:TermEntity,userName:string,borderCrossName:string)
    {
        let term:TermEntity={...input};
        if(!term){
            return {
                message:'Error'
            }
        }
        const selectedDate:Date=input.DateAndTime;
        const time=await this.findNextAvailableTerm(selectedDate);

       const user:UserEntity=await this.userService.getOneUser(userName);
       const borderCross:BorderCrossEntity=await this.borderCrossService.getBCByName(borderCrossName);
       console.log(user.ListOfTerms);
       console.log(borderCross.ListOfTerms);
       
      if(user.ListOfTerms==undefined)
      {
        user.ListOfTerms=[];
        user.ListOfTerms.push(term);
      }
      else{
        user.ListOfTerms.push(term);
      }
      if(borderCross.ListOfTerms==undefined){
          borderCross.ListOfTerms=[];
          borderCross.ListOfTerms.push(term);
        }
        else{
            borderCross.ListOfTerms.push(term);
        }
        term.User=user;
        term.BorderCross=borderCross;
        term.DateAndTime=time;
        term = await this.termRepository.save(term);
        this.notService.addNotification(`Uspesno ste zakazali termin u terminu : ${time} \n Potvrdite predlozeno vreme:`,userName,term.Id);
        return {
            message:'Success'
        }
    }
    async findNextAvailableTerm(selectedDate: Date): Promise<Date> {
        if (!(selectedDate instanceof Date)) {
          selectedDate = new Date(selectedDate);
        }
      
     
        selectedDate.setHours(0, 0, 0, 0);
      
  
        const overlappingTerms: TermEntity[] = await this.termRepository.find({
          where: {
            DateAndTime: Between(
              new Date(selectedDate),
              new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
            ),
          },
          order: {
            DateAndTime: "ASC",
          },
        });
      
     
        let nextAvailableDate = new Date(selectedDate);
      
       
        while (overlappingTerms.some(term => term.DateAndTime && term.DateAndTime.getTime() === nextAvailableDate.getTime())) {
          nextAvailableDate = new Date(nextAvailableDate.getTime() + 30 * 60 * 1000); 
        }
      
      
        if (nextAvailableDate.getHours() >= 23 && nextAvailableDate.getMinutes() >= 30) {
          nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
          nextAvailableDate.setHours(0, 0, 0, 0);
        }
      
        return nextAvailableDate;
      }
      
    async GetTerms(username:string)
    {
        const bc=await this.borderCrossService.getBCByUsername(username);
        
        const term = await this.bcRepo.findOne({
            where: { Username: username }, 
            relations: { ListOfTerms: true, },
        });
        return  await term.ListOfTerms.filter(term=>term.Accepted==true);
    }
    async getNumOfTerms()
    {
        const terms=await this.termRepository.find();
        return terms.length;
    }
    async getPersonalTerms(username:string)
    {
        const user=await this.userService.getOneUser(username);
        const term=await this.userRepo.findOne({
            where:{Username:username},
            relations:{ListOfTerms:true,},
        });
        return term.ListOfTerms.filter(term=>term.Accepted==true);
    }
    async acceptTerm(idNoticication:number,answer:Boolean)
    {
        let notification=await this.notRepo.findOne({where:{Id:idNoticication},relations:{Term:true}});
        notification.Term.Accepted=answer;
        await this.termRepository.save(notification.Term);
        console.log(notification.Term);
         return {
          message:'success'
         }
    }
}