import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BorderCrossSerivce } from "./border.cross.service";
import { BorderCrossEntity } from "./border.cross.entity";
import { TermService } from "src/Term/term.service";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { AdminGuard } from "src/Auth/admin.role.guard";
import { BorderCrossGuard } from "src/Auth/border-cross.role.guard";

@Controller('BorderCross')
export class BorderCrossContrller{  
      constructor(@Inject(BorderCrossSerivce)
      private readonly bcService:BorderCrossSerivce){}

      @Get('getAllBC')
      async getAllBC()
      {
        return this.bcService.getAllBC();
      }
      @UseGuards(JwtAuthGuard,AdminGuard)
      @Post('addBC')
      async addBC(@Body() input:BorderCrossEntity)
      {
        return this.bcService.addBorderCross(input);
      }
      @UseGuards(JwtAuthGuard,BorderCrossGuard)
      @Get('getOneBC/:username')
      async getOneBC(@Param('username') username:string)
      {
        return this.bcService.getBCByUsername(username);
      }
      @UseGuards(JwtAuthGuard,BorderCrossGuard)
      @Patch('checkTerm/:idTerm/:isCrossed/:isComeBack/:irreg')
      async checkTerm(@Param('idTerm') idTerm:number, @Param('isCrossed')isCrossed:string,@Param('isComeBack') isComeBack:string,@Param('irreg') irreg:string)
      {
        return this.bcService.checkTerm(idTerm,isCrossed,isComeBack,irreg);
      }
      @UseGuards(JwtAuthGuard,AdminGuard)
      @Get('getNumOfBC')
      async getNumOfBC()
      {
        return this.bcService.getNumOfBC();
      }
      @UseGuards(JwtAuthGuard,AdminGuard)
      @Delete('deleteBC/:name')
      async deleteBC(@Param('name') name:string)
      {
        const namedec=decodeURIComponent(name);
        console.log(name);
        return this.bcService.deleteBC(namedec);
      }

}