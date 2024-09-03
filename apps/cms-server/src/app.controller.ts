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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SentryFilter } from './common/sentry.filter';
import { CreateUserDto } from './users/dto/create-user.dto';
import { RoleGuard } from './common/role.guard';
import { Roles } from './common/roles.decorator';

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

  @Get('cats')
  @Roles('admin')
  @UseGuards(RoleGuard)
  getCats() {
    return 'hello cats';
  }

  @Put()
  create(@Body() dto: CreateUserDto) {
    return dto;
  }

  @Get('error')
  err() {
    throw new HttpException('something wrong.', HttpStatus.BAD_REQUEST);
  }

  @Get('number/:id')
  num(@Param('id') id: number) {
    return id;
  }
}
