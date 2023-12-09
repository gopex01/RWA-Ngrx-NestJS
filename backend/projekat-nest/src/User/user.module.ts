import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { AuthService } from "src/Auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/Auth/constants";
import { AuthModule } from "src/Auth/auth.module";
import { NotificationEntity } from "src/Notification/notification.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,NotificationEntity])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{}