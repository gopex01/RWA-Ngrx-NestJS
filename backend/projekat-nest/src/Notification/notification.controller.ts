import { Controller, Get, Inject, Param, Patch, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { UserGuard } from "src/Auth/user.role.guard";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";

@Controller('Notification')
export class NotificationController{
    constructor(@Inject(NotificationService)
    private readonly notService:NotificationService){}

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('readNot/:idNot')
    async readNot(@Param('idNot')idNot:number)
    {
        this.notService.readNotification(idNot);
    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Get('getNot/:username')
    async getNot(@Param('username') username:string)
    {
        return this.notService.getNotification(username);
    }
}