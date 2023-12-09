import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TermService } from "./term.service";
import { TermEntity } from "./term.entity";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { UserGuard } from "src/Auth/user.role.guard";
import { AdminGuard } from "src/Auth/admin.role.guard";
import { BorderCrossGuard } from "src/Auth/border-cross.role.guard";

@Controller('Term')
export class TermController{
    constructor(@Inject(TermService)
    private readonly termService:TermService){}

    @UseGuards(JwtAuthGuard,UserGuard)
    @Post('addTerm/:username/:borderCrossName')
    async addTerm(@Body() input:TermEntity, @Param('username') username:string, @Param('borderCrossName') broderCrossName:string)
    {
        return await this.termService.addTerm(input,username,broderCrossName);
    }
    @UseGuards(JwtAuthGuard,BorderCrossGuard)
    @Get('getTerms/:username')
    async getTerms(@Param('username') username:string)
    {
        return await this.termService.GetTerms(username);
    }
    @UseGuards(JwtAuthGuard,AdminGuard)
    @Get('getNumOfTerms')
    async getNumOfTerms()
    {
        return this.termService.getNumOfTerms();
    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Get('getPersonalTerms/:username')
    async getPersonalTerms(@Param('username') username:string)
    {
        return await this.termService.getPersonalTerms(username);
    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('acceptTerm/:idNotification/:answer')
    async acceptTerm(@Param('idNotification') idNot:number,@Param('answer') answer:string)
    {
        return await this.termService.acceptTerm(idNot,answer === 'true');
    }

}