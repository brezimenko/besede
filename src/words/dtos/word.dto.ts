import { Expose } from "class-transformer";

export class WordDto {
  @Expose()
  id: number;
  @Expose()
  word: string;
  @Expose()
  normalizedWord: string;
  @Expose()
  synonym: string;
  @Expose()
  definition: string;
  @Expose()
  examples: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}
