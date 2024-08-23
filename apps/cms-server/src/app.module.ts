import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { PassportModule } from './passport/passport.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PassportModule],
  controllers: [AppController],
})
export class AppModule {}
