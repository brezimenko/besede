import { Expose, Transform } from "class-transformer";

export class GuessDto {
  @Expose()
  id: number;
  @Transform(({ obj }) => obj.word.normalizedWord)
  @Expose()
  word: string;
  @Transform(({ obj }) => obj.word.description)
  @Expose()
  description: string;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
  @Transform(({ obj }) => obj.guesses.split(''))
  @Expose()
  guesses: string[];
}
