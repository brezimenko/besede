import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Word } from "./word.entity";
import { PuppeteerModule } from "nest-puppeteer";

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
  imports: [TypeOrmModule.forFeature([Word]), PuppeteerModule.forFeature()]
})
export class WordsModule {}
