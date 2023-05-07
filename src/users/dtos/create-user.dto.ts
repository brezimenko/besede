import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'joe@gmail.com', description: 'User email'})
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({example: 'f13h1g02i10o3g=!WS.', description: 'User password'})
  @IsString()
  password: string;

  @ApiProperty({example: 'JohnWick', description: 'Username'})
  @IsString()
  @IsOptional()
  username?: string;
}
