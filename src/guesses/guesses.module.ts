import { Module } from '@nestjs/common';
import { GuessesService } from './guesses.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guess } from "./guess.entity";
import { GuessesController } from "./guesses.controller";
import { UsersModule } from "../users/users.module";
import { WordsModule } from "../words/words.module";

@Module({
  imports: [TypeOrmModule.forFeature([Guess]), UsersModule, WordsModule],
  controllers: [GuessesController],
  providers: [GuessesService]
})
export class GuessesModule {}
