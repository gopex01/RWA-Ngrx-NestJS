import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { BorderCrossEntity } from "./border.cross.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Role } from "src/Roles/roles.enum";
import { TermEntity } from "src/Term/term.entity";
import { NotificationEntity } from "src/Notification/notification.entity";
import { NotificationService } from "src/Notification/notification.service";
@Injectable()
export class BorderCrossSerivce{
    
    constructor(@InjectRepository(BorderCrossEntity)
    private borderCrossRepository:Repository<BorderCrossEntity>,
    @InjectRepository(TermEntity) private termRepo:Repository<TermEntity>,
    private noService:NotificationService){}

    async addBorderCross(input:BorderCrossEntity)
    {
        const borderCross:BorderCrossEntity={...input};
        if(!borderCross)
        {
            return {
                message:'Error'
            }
        }
        try{
            const hashPass=await bcrypt.hash(input.Password,10);
            borderCross.Password=hashPass;
            borderCross.rola=Role.BorderCross;
            await this.borderCrossRepository.insert(borderCross);
        
        return {
            message:'Success'
        }
    }
    catch(error){
        if(error.code='23505')
        {
            const constraint = error.detail.match(/\((.*?)\)/); 
            if (constraint) {
              const columns = constraint[1].split(', ');
              
              return `User with ${columns.join(', ')} is already exist `
            }
            return error;
        }
    }
    }
    async getOneBC(username:string):Promise<BorderCrossEntity|null>{
        const borderCross:BorderCrossEntity=await this.borderCrossRepository.findOne({where:{Username:username}});

        return borderCross;
    }
    async getBCByName(name:string):Promise<BorderCrossEntity|null>{
        const borderCross:BorderCrossEntity=await this.borderCrossRepository.findOne({where:{Name:name}});
        return borderCross;
    }
    async getAllBC():Promise<BorderCrossEntity[]|null>{
        return await this.borderCrossRepository.find();
    }
    async accessBC(Name:string, AccessPassword:string){
        const BC=await this.getOneBC(Name);
        if(BC.Password==AccessPassword)
        {
            return {
                message:'sucess',
                BC
            }
        }
        else{
            message:'Password is incorect'
        }
    }
    async getBCByUsername(username:string)
    {
        return this.borderCrossRepository.findOne({where:{Username:username}});
    }
    async checkTerm(idTerm:number,isCrossed:string,isComeBack:string,irreg:string)
    {
        if(isCrossed=='Yes' || isComeBack=='Yes')
        {
            let term:TermEntity=await this.termRepo.findOne({where:{Id:idTerm}, relations: {User: true}});
            //let newNotification:NotificationEntity=new NotificationEntity();
            let content="";
            if(isCrossed=='Yes')
            {
                content=`Uspesno ste presli granicu! Stanje vaseg zahteva pod rednim brojem ${idTerm} je azurirano`;
            }
            if(isComeBack=='Yes'){
                content=`Uspesno ste presli granicu i vratili se u svoju drzavu,Dobrodosli! Stanje vaseg zahteva pod rednim brojem ${idTerm} je azurirano.`;
            }
            this.noService.addNotification(content,term.User.Username,idTerm);//ovamo je problem
        }
        const term=await this.termRepo.findOne({where:{Id:idTerm}});
        if(!term){
            return {
                message:'error'
            }
        }
        console.log(isCrossed);
        console.log(isComeBack);
        if(term.IsCrossed)
        {
            if(isComeBack=='Yes'){
                term.IsComeBack=true;
            }
            if(isComeBack=='No')
            {
                term.IsComeBack=false;
            }
        }
        else{
            if(isCrossed=='Yes')
            {
                term.IsCrossed=true;
            }
            if(isCrossed=='No')
            {
                term.IsCrossed=false;
            }
            if(isComeBack=='Yes'){
                term.IsComeBack=true;
            }
            if(isComeBack=='No')
            {
                term.IsComeBack=false;
            }
        }
        term.Irregularities=irreg;
        this.termRepo.save(term);
    }
    async getNumOfBC()
    {
        const bc=await this.borderCrossRepository.find();
        return bc.length;
    }
    async deleteBC(name:string)
    {
        console.log(name);
        const bc=await this.borderCrossRepository.findOne({where:{Name:name}});
     
        if(!bc){
            return{
                message:'error'
            }
        }
        await this.borderCrossRepository.delete(bc.Id);
        return {
            message:'success'
        }
    }
}