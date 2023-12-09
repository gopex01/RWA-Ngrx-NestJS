import { Controller, Get,Request,Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './Auth/local-auth.guard';
import { AuthService } from './Auth/auth.service';
@Controller()
export class AppController {
  constructor(private readonly appService:AppService,
    private readonly authServices:AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.authServices.login(req.user);
  }
}
