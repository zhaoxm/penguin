import { Controller, Get, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './passport/jwt.guard';
import { LocalAuthGuard } from './passport/local.guard';
import { UserPayload } from './passport/entities/payload.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user!);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user as UserPayload;
  }
}
