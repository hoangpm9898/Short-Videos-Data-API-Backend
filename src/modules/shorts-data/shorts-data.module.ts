/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShortsDataService } from './shorts-data.service';
import { ProviderFactory } from './providers/provider.factory';
import { PexelsApiProvider } from './providers/pexels.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortData, ShortDataSchema } from '#root/common/schema/shorts-data.schema';
import { ShortsDataController } from '#root/modules/shorts-data/shorts-data.controller';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: ShortData.name, schema: ShortDataSchema }])],
  providers: [
    ShortsDataService, ProviderFactory, PexelsApiProvider
  ],
  controllers: [ShortsDataController],
  exports: [ShortsDataService],
})
export class ShortsDataModule {}
