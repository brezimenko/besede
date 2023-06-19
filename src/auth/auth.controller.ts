import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request, Session
} from "@nestjs/common";
import { Public } from './decorators/public.decorator';
import { AuthService } from "./auth.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Serialize } from "../interceptors/serialize-interceptor";
import { UserDto } from "../users/dtos/user.dto";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserWithAuthDto } from "../users/dtos/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  @ApiBearerAuth()
  @Serialize(UserDto)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }


  @Post('/signout')
  @ApiBearerAuth()
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Public()
  @Post('/signup')
  @Serialize(UserDto)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user
  }

  @Public()
  @Post('/signin')
  @Serialize(UserWithAuthDto)
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const payload = await this.authService.signin(body.email, body.password);
    session.userId = payload.access_token;
    return payload
  }
}
