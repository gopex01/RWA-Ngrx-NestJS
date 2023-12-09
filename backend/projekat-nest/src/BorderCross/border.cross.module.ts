import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BorderCrossEntity } from "./border.cross.entity";
import { BorderCrossContrller } from "./border.cross.controller";
import { BorderCrossSerivce } from "./border.cross.service";
import { TermEntity } from "src/Term/term.entity";
import { NotificationEntity } from "src/Notification/notification.entity";
import { NotificationService } from "src/Notification/notification.service";
import { Repository } from "typeorm";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";

@Module({
    imports:[TypeOrmModule.forFeature([BorderCrossEntity,TermEntity,NotificationEntity,UserEntity])],
    controllers:[BorderCrossContrller],
    providers:[BorderCrossSerivce,NotificationService,UserService,Repository],
    exports:[BorderCrossSerivce]
})
export class BorderCrossModule{}