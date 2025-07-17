/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

import { InfoDataModule } from './modules/info-data/info-data.module';
import { ShortsDataModule } from './modules/shorts-data/shorts-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '#root/config';
import { AppController } from '#root/app.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(config.DATABASE_URL),
    HttpModule,
    InfoDataModule,
    ShortsDataModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
