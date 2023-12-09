import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./notification.entity";
import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";
import { Repository } from "typeorm";
import { TermEntity } from "src/Term/term.entity";

@Module({
    imports:[TypeOrmModule.forFeature([NotificationEntity]),TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([TermEntity])],
    controllers:[NotificationController],
    providers:[NotificationService,UserService,Repository],
    exports:[NotificationService]
})
export class NotificationModule{}