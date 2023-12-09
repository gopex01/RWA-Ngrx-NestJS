import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User/user.entity';
import { AuthModule } from './Auth/auth.module';
//import { TermModule } from './Term/term.module';
import { BorderCrossModule } from './BorderCross/border.cross.module';
import { AdminModule } from './Admin/admin.module';
import { TermModule } from './Term/term.module';
import { NotificationModule } from './Notification/notification.module';
import { BorderCrossEntity } from './BorderCross/border.cross.entity';
import { AdminEntity } from './Admin/admin.entity';
import { TermEntity } from './Term/term.entity';
import { NotificationEntity } from './Notification/notification.entity';
//import { TermEntity } from './Term/term.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'pufla12',
    database:'projekat',
    autoLoadEntities:true,
    entities:[UserEntity,BorderCrossEntity,AdminEntity,TermEntity,NotificationEntity],
    synchronize:true
  }),
  UserModule,
  AuthModule,
  BorderCrossModule,
  AdminModule,
  TermModule,
  NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
