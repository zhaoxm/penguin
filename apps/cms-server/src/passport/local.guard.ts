import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PassportService } from './passport.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly passportService: PassportService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const { body } = request;
      const user = await this.passportService.validate(
        body.username,
        body.password,
      );

      if (!user) {
        return false;
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
