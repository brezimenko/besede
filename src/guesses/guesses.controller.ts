import { Serialize } from "../interceptors/serialize-interceptor";
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GuessesService } from "./guesses.service";
import { GuessCreateDto } from "./dtos/guess-create.dto";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { GuessDto } from "./dtos/guess.dto";
import { UsersService } from "../users/users.service";
import { WordsService } from "../words/words.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('guesses')
export class GuessesController {
  constructor(private guessesService: GuessesService, private wordsService: WordsService, private usersService: UsersService) {
  }

  @ApiBearerAuth()
  @Post()
  @Serialize(GuessDto)
  async createGuess(@Body() guess: GuessCreateDto, @CurrentUser() user: User) {
    const word = await this.wordsService.getWord(guess.wordId)
    if (!word) {
      throw new NotFoundException('Word not found')
    }
    return this.guessesService.createGuess(guess, user, word)
  }

  @ApiBearerAuth()
  @Get('/me')
  @Serialize(GuessDto)
  getOwnGuesses(@CurrentUser() user: User) {
    return this.guessesService.findGuessesForUser(user)
  }

  @ApiBearerAuth()
  @Get('/stats/:id')
  async getStats(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    return this.guessesService.getGuessingStatsForUser(user)
  }

  @ApiBearerAuth()
  @Get('/:id')
  @Serialize(GuessDto)
  async getGuessesForUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    return this.guessesService.findGuessesForUser(user)
  }
}
