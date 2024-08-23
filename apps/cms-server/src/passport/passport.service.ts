import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/passport/constants';

@Injectable()
export class PassportService {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  sign(payload: jwt.JwtPayload) {
    return jwt.sign(payload, jwtConstants.secret);
  }
}
