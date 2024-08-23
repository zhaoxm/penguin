import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/passport/constants';

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

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConstants.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }
}
