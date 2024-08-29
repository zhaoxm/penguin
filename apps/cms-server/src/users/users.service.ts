import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MSG') private msg: string) {}

  say() {
    return this.msg;
  }
}
