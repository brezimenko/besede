import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuessesModule } from './guesses/guesses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { PuppeteerModule } from "nest-puppeteer";
import { dataSourceOptions } from "../db/data-source";
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { config } from "./config/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    AuthModule,
    UsersModule,
    WordsModule,
    GuessesModule,
    PuppeteerModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
