import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UsersService } from "./users.service";
import {promisify} from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {
  }

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // If not, hash their password
    // Generate a random salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt + the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the salt and the hashed password together
    const result = salt + '.' + hash.toString('hex');
    // Create a user and save it to the database
    const user = await this.userService.create(email, result);
    return user;
    // Return that user
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
    // See if email exists
    // If not, throw an error
    // If email exists, hash the password provided and compare it to the password stored in the database
    // If they match, return the user
    // Otherwise, throw an error

  }
}
