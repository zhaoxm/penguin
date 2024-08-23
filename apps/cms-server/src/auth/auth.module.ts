import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from 'src/passport/passport.module';

@Module({
  imports: [PassportModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
