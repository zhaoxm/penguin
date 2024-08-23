import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [UsersModule],
  providers: [PassportService, JwtAuthGuard],
  exports: [PassportService, JwtAuthGuard],
})
export class PassportModule {}
