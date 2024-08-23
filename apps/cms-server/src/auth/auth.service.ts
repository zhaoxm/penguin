import { Injectable } from '@nestjs/common';
import { PassportService } from 'src/passport/passport.service';

@Injectable()
export class AuthService {
  constructor(private readonly passportService: PassportService) {}

  async login(user: Express.User) {
    return {
      access_token: this.passportService.sign(user),
    };
  }
}
