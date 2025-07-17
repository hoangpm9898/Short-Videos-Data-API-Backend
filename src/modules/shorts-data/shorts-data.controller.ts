import { Controller, Get, Query } from '@nestjs/common';
import { ShortsDataService } from './shorts-data.service';

@Controller('shorts')
export class ShortsDataController {
  constructor(private readonly shortsService: ShortsDataService) {}

  @Get()
  async getShorts(
    @Query('cursor') cursor?: string,
    @Query('limit') limit = '10',
  ) {
    return this.shortsService.getShorts(cursor, parseInt(limit, 10));
  }

  @Get('by-tags')
  async getShortsByTags(
    @Query('tags') tags: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = '10',
  ) {
    const tagList = tags
      ? tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')
      : [];
    return this.shortsService.getShortsByTags(
      tagList,
      cursor,
      parseInt(limit, 10),
    );
  }

  @Get('search')
  async searchShorts(
    @Query('query') query: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = '10',
  ) {
    return this.shortsService.searchShorts(query, cursor, parseInt(limit, 10));
  }
}
