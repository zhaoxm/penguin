import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SentryFilter } from './common/sentry.filter';
import { ParseIntPipe } from './common/parse-int.pipe';
import { CreateUserDto } from './users/dto/create-user.dto';
import { ParseUserPipe } from './common/parse-user.pipe';

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

  @Put()
  create(@Body(ParseUserPipe) dto: CreateUserDto) {
    return dto;
  }

  @Get('error')
  err() {
    throw new HttpException('something wrong.', HttpStatus.BAD_REQUEST);
  }

  @Get('number/:id')
  num(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
