import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuessesModule } from './guesses/guesses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { PuppeteerModule } from "nest-puppeteer";
import { dataSourceOptions } from "../db/data-source";

@Module({
  imports: [
    UsersModule,
    WordsModule,
    GuessesModule,
    PuppeteerModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
