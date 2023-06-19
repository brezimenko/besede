import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { Serialize } from "../interceptors/serialize-interceptor";
import { WordDto } from "./dtos/word.dto";
import { WordsService } from "./words.service";
import { WordCreateDto } from "./dtos/word-create.dto";
import { Public } from "../auth/decorators/public.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Serialize(WordDto)
@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {
  }

  @ApiBearerAuth()
  @Public()
  @Get('/random')
  getRandomWord() {
    return this.wordsService.getRandomWord()
  }

  @ApiBearerAuth()
  @Get('/scrape')
  async scrapeSSKJ() {
    return this.wordsService.scrapeTheShitOutOfSSKJ()
  }

  @ApiBearerAuth()
  @Public()
  @Get('/:id')
  async getWord(@Param('id') id: string) {
    const word = await this.wordsService.getWord(parseInt(id))
    if (!word) {
      throw new NotFoundException('Word not found')
    }
    return word
  }

  @ApiBearerAuth()
  @Post()
  createWord(@Body() body: WordCreateDto) {
    return this.wordsService.createWord(body)
  }

  @ApiBearerAuth()
  @Delete('/:id')
  removeWord(@Param('id') id: string) {
    return this.wordsService.removeWord(parseInt(id))
  }

  @ApiBearerAuth()
  @Patch('/:id')
  updateWord(@Param('id') id: string, @Body() body: Partial<WordCreateDto>) {
    return this.wordsService.updateWord(parseInt(id), body)
  }
}
