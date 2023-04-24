import { IsArray, IsOptional, IsString } from "class-validator";

export class WordCreateDto {
  @IsString()
  definition: string;
  @IsString()
  @IsOptional()
  synonym: string;
  @IsString()
  word: string;
  @IsOptional()
  @IsArray()
  @IsString({each: true})
  examples: string[];
}
