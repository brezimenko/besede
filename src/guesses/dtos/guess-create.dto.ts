import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class GuessCreateDto {
  @IsNumber()
  wordId: number;
  @IsArray()
  @IsString({each: true})
  guesses: string[];
}
