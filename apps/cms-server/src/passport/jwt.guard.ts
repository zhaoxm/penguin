import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/passport/constants';
import { UserPayload } from './entities/payload.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = await this.verifyToken(token);
      request.user = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private verifyToken(token: string): Promise<UserPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConstants.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        if (decoded == null || typeof decoded === 'string') {
          return reject(new UnauthorizedException('invalid payload'));
        }

        resolve(decoded as UserPayload);
      });
    });
  }
}
