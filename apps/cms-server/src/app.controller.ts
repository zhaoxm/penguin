import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SentryFilter } from './common/sentry.filter';

@UseFilters(SentryFilter)
@Controller()
export class AppController {
  @Inject(UsersService)
  private usersService: UsersService;

  constructor() {}

  @Get()
  test() {
    const msg = this.usersService.say();
    console.log('msg: ', msg);
    return msg;
  }

  @Get('error')
  err() {
    throw new HttpException('something wrong.', HttpStatus.BAD_REQUEST);
  }
}
