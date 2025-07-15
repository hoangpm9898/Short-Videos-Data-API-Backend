/* eslint-disable prettier/prettier */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiService } from './api.service';
import { Short } from '../../common/entities/short.entity';

@ApiTags('Shorts')
@Controller('shorts')
export class ApiController {

  constructor(private readonly apiService: ApiService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated list of shorts' })
  @ApiResponse({ status: 200, type: [Short] })
  async getShorts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.apiService.getShorts(page, limit);
  }

  @Get('by-tags')
  @ApiOperation({ summary: 'Get shorts by tags' })
  @ApiResponse({ status: 200, type: [Short] })
  async getShortsByTags(
    @Query('tags') tags: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const tagArray = tags.split(',');
    return this.apiService.getShortsByTags(tagArray, page, limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search shorts by description' })
  @ApiResponse({ status: 200, type: [Short] })
  async searchShorts(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.apiService.searchShorts(query, page, limit);
  }
}
