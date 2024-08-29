import { DynamicModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({})
export class UsersModule {
  static forRoot(msg: string): DynamicModule {
    return {
      module: UsersModule,
      providers: [
        {
          provide: 'USER_MSG',
          useValue: msg,
        },
        UsersService,
      ],
      exports: [UsersService],
    };
  }
}
