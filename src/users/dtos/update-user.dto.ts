import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({example: 'Noviusername', description: 'Your new username'})
  username: string;
}
