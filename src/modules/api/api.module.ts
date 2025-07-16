/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Short } from '#root/common/entities/short.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Short])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
