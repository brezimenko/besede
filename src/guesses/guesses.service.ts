import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Guess } from "./guess.entity";
import { GuessCreateDto } from "./dtos/guess-create.dto";
import { Word } from "../words/word.entity";

@Injectable()
export class GuessesService {
  constructor(
    @InjectRepository(Guess)
    private readonly guessRepository: Repository<Guess>,
  ) {}

  async findGuessesForUser(user: User): Promise<Guess[]> {
    return await this.guessRepository.find({where: {user: {id: user.id}}, relations: ['word', 'user']})
  }

  async createGuess(guess: GuessCreateDto, user: User, word: Word): Promise<Guess> {
    const normalizedWord = word.normalizedWord
    const uniqueCharacters = [...new Set(normalizedWord.split(''))]
    const areAllCharactersInGuess = uniqueCharacters.every(character => guess.guesses.includes(character))
    const success = (uniqueCharacters.length > (guess.guesses.length - 6)) && areAllCharactersInGuess

    const createdGuess = this.guessRepository.create({guesses: guess.guesses.join(''), success})
    createdGuess.user = user
    createdGuess.word = word
    return this.guessRepository.save(createdGuess);
  }

  async getGuessingStatsForUser(user: User) {
    const guesses = await this.findGuessesForUser(user)
    const words = guesses.map(guess => guess.word.word)
    const uniqueWords = [...new Set(words)]
    const wordsGuessed = uniqueWords.length
    const totalGuesses = guesses.length
    const correctGuesses = guesses.filter(guess => guess.word.normalizedWord.length > (guess.guesses.length - 7 )).length
    const incorrectGuesses = totalGuesses - correctGuesses
    return {
      wordsGuessed,
      totalGuesses,
      correctGuesses,
      incorrectGuesses
    }
  }
}
