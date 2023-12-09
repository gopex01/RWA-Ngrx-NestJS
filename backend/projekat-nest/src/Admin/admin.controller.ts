import { Body, Controller, Get, Inject,Param,Post } from "@nestjs/common";
import { BorderCrossEntity } from "src/BorderCross/border.cross.entity";
import { BorderCrossSerivce } from "src/BorderCross/border.cross.service";
import { UserService } from "src/User/user.service";
import { AdminService } from "./admin.service";
import { AdminEntity } from "./admin.entity";

@Controller('Admin')
export class AdminController{
    
    constructor(@Inject(UserService)
    private readonly userService:UserService,
    private readonly adminService:AdminService
    ){}

    @Get('getAllUsers')
    async getAllUsers()
    {
        return this.userService.getAllUsers();
    }
    @Post('addAdmin')
    async addAdmin(@Body() input:AdminEntity)
    {
        return this.adminService.addAdmin(input);
    }

}