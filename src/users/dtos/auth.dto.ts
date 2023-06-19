import { Expose } from "class-transformer";
import { UserDto } from "./user.dto";

export class AuthDto {
  @Expose()
  access_token: string;
}

export class UserWithAuthDto extends UserDto {
  @Expose()
  access_token: string;
}
