import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TermEntity } from "./term.entity";
import { TermController } from "./term.controller";
import { TermService } from "./term.service";
import { UserService } from "src/User/user.service";
import { BorderCrossSerivce } from "src/BorderCross/border.cross.service";
import { UserEntity } from "src/User/user.entity";
import { BorderCrossEntity } from "src/BorderCross/border.cross.entity";
import { Repository } from "typeorm";
import { NotificationService } from "src/Notification/notification.service";
import { NotificationEntity } from "src/Notification/notification.entity";

@Module({

    imports:[TypeOrmModule.forFeature([TermEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([BorderCrossEntity]),
TypeOrmModule.forFeature([NotificationEntity])],
    controllers:[TermController],
    providers:[TermService,BorderCrossSerivce,UserService,Repository,NotificationService],
    exports:[TermService]
})
export class TermModule{}