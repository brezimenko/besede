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
import { User } from "./user.entity";
import { CurrentUser } from "./decorators/current-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get('/:id')
  @Serialize(UserDto)
  async findUser(@Param('id') id: string) {
    console.log('YOYOYO', id)
    const user = await this.usersService.findOne(parseInt(id));
    return user || new NotFoundException('User not found')
  }

  @ApiBearerAuth()
  @Get()
  @Serialize(UserDto)
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @Serialize(UserDto)
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @ApiBearerAuth()
  @Patch('/:id')
  @Serialize(UserDto)
  updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.update(parseInt(id), body);
  }
}
