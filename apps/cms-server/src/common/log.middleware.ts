import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LogMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.time('useTime');
    next();
    console.timeEnd('useTime');
  }
}
