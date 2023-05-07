import {
  Body,
  Controller,
  Delete, FileTypeValidator,
  Get, HttpStatus, MaxFileSizeValidator,
  NotFoundException,
  Param, ParseFilePipe, ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Session, UploadedFile,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize-interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {
  }

  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user
  }

  @Post('/change-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile(
     new ParseFilePipe({
       validators: [
         new FileTypeValidator({fileType: /png|jpg|jpeg/}),
         new MaxFileSizeValidator({maxSize: 5000000}),
       ],
     })
   )
     file: Express.Multer.File, @CurrentUser() user: User) {
    return this.usersService.updateAvatar(user.id, file);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    return user || new NotFoundException('User not found')
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.update(parseInt(id), body);
  }
}
