import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';

import * as nodemailer from 'nodemailer';
import { Role } from "src/Roles/roles.enum";
@Injectable()
export class UserService{
    
    private transporter;
    constructor(@InjectRepository(UserEntity) private userRepository:Repository<UserEntity>){
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'gopex2001@gmail.com', 
              pass: 'fzau shuu mvdm jcgx', 
            },
            secure:true,
          });
    }

    async getAllUsers():Promise<UserEntity[]>{
        return await this.userRepository.find();
    }
    async getOneUser(user:string):Promise<UserEntity| null>
    {
        return await this.userRepository.findOne({where:{Username:user}});
    }
    async addUser(input:UserEntity)
    {
        const user:UserEntity={...input};
        console.log(user);   
        if(!user){
            return {
                message:'Error'
            }
        }
        try{
        const hashPass=await bcrypt.hash(input.Password,10);
        user.Password=hashPass;
        user.rola=Role.User;
        await this.userRepository.save(user);
        await this.sendVerificationEmail(input.Username,input.Email);
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
    async sendVerificationEmail(username: string, email: string) {
        const verificationLink = `http://localhost:3000/User/verifyAccount/${username}`;
        const mailOptions = {
          from: 'gopex2001@gmail.com', // Vaša e-adresa
          to: email,
          subject: 'Verifikacija e-adrese',
          text: `Kliknite na sledeći link da biste verifikovali svoju e-adresu: ${verificationLink}`
        };
    
        await this.transporter.sendMail(mailOptions);
      }
    async updateEmail(newEmail:string,userName:string){
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
        try{
            user.Email=newEmail;
            await this.userRepository.save(user);
        }
        catch(error){
            if(error.code==='23505')
            {
                return 'User with this email is already exist'
            }
        }
    }
    async updatePassword(newPassword:string,userName:string){
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
        const hashNewPass=await bcrypt.hash(newPassword,10);
        user.Password=hashNewPass;
        await this.userRepository.save(user);
        
    }
    async deactivateAccount(username:string,password:string)
    {
        const user=await this.userRepository.findOne({where:{Username:username}});
        if(!user)
        {
            return {
                message:'error'
            }
        }
        const isMatchs=await bcrypt.compare(password,user.Password);
        if(isMatchs)
        {
            this.userRepository.delete(user.Id);
            return {
                message:'success'
            }
        }
        else{
            return{
                message:'error'
            }
        }

    }
    async updatePhoneNumber(newPhoneNumber:string,userName:string){
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
        try{
            user.PhoneNumber=newPhoneNumber;
            await this.userRepository.save(user);
            return {
                message:'success'
            }
        }
        catch(error){
            if(error.code=='23505')
            {
                return 'User with this phone number is already exist'
            }
        }
    }
    async updateUserName(newUserName:string,userName:string){
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
        try{
            user.Username=newUserName;
            await this.userRepository.save(user);
        }
        catch(error){
            if(error.code=='23505')
            {
                return 'User with this username is already exist';
            }
        }
    }
    async verifyAccount(userName:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
        if(!user)
        {
            return Error;
        }
        user.Verified=true;
        await this.userRepository.save(user);
        return "You have successfully verified your account";
    }
    async updateName(newName:string,userName:string){
        const user:UserEntity=await this.userRepository.findOne({where:{Username:userName}});
            user.NameAndSurname=newName;
            await this.userRepository.save(user);
        
       
    }
    async getNumOfUsers()
    {
        const users=await this.userRepository.find();
        return users.length;
    }
}