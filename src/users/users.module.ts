import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }, AuthService]
})
export class UsersModule {}
