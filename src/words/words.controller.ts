import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { Serialize } from "../interceptors/serialize-interceptor";
import { WordDto } from "./dtos/word.dto";
import { WordsService } from "./words.service";
import { WordCreateDto } from "./dtos/word-create.dto";

@Serialize(WordDto)
@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {
  }
  @Get('/random')
  getRandomWord(@Param('id') id: string) {
    return this.wordsService.getRandomWord()
  }

  @Get('/scrape')
  async scrapeSSKJ() {
    return this.wordsService.scrapeTheShitOutOfSSKJ()
  }

  @Get('/:id')
  async getWord(@Param('id') id: string) {
    const word = await this.wordsService.getWord(parseInt(id))
    if (!word) {
      throw new NotFoundException('Word not found')
    }
    return word
  }

  @Post()
  createWord(@Body() body: WordCreateDto) {
    return this.wordsService.createWord(body)
  }

  @Delete('/:id')
  removeWord(@Param('id') id: string) {
    return this.wordsService.removeWord(parseInt(id))
  }

  @Patch('/:id')
  updateWord(@Param('id') id: string, @Body() body: Partial<WordCreateDto>) {
    return this.wordsService.updateWord(parseInt(id), body)
  }
}
