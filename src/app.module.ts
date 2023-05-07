import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import { WordsModule } from './words/words.module';
import { Word } from "./words/word.entity";
import { PuppeteerModule } from "nest-puppeteer";
import { dataSourceOptions } from "../db/data-source";

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    PuppeteerModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
