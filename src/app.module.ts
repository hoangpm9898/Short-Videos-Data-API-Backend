/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

import { InfoDataModule } from './modules/info-data/info-data.module';
import { ShortsDataModule } from './modules/shorts-data/shorts-data.module';
import { ApiModule } from './modules/api/api.module';
import { databaseConfig } from './common/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
    HttpModule,
    InfoDataModule,
    ShortsDataModule,
    ApiModule,
  ],
})
export class AppModule {}
