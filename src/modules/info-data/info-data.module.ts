/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { InfoDataService } from './info-data.service';
import { InfoDataScheduler } from './info-data.scheduler';
import { ShortsDataModule } from '#root/modules/shorts-data/shorts-data.module';

@Module({
  imports: [HttpModule, ShortsDataModule],
  providers: [InfoDataService, InfoDataScheduler],
  exports: [InfoDataService],
})
export class InfoDataModule {}
