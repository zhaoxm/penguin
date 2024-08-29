import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { LogMiddleWare } from './common/log.middleware';

@Module({
  imports: [UsersModule.forRoot('hello world.')],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleWare).forRoutes('');
  }
}
