/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortsDataService } from './shorts-data.service';
import { Short } from '#root/common/entities/short.entity';
import { ProviderFactory } from './providers/provider.factory';
import { PexelsApiProvider } from './providers/pexels.provider';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Short])],
  providers: [
    ShortsDataService, ProviderFactory, PexelsApiProvider
  ],
  exports: [ShortsDataService],
})
export class ShortsDataModule {}
