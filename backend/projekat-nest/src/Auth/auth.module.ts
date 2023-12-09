import { Module } from "@nestjs/common";
import { UserModule } from "src/User/user.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "src/User/user.service";
import { BorderCrossModule } from "src/BorderCross/border.cross.module";
import { AdminModule } from "src/Admin/admin.module";

@Module({
    imports:[UserModule,
        BorderCrossModule,
        AdminModule,
        PassportModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{expiresIn:'60m'},
        }),
    ],
    providers:[AuthService,LocalStrategy,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule{}