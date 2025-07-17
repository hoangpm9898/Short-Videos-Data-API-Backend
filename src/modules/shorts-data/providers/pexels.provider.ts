/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { BaseProvider } from './base.provider';
import { ShortsData } from '#root/common/dto/shorts-data.dto';
import { config } from '#root/config';

@Injectable()
export class PexelsApiProvider extends BaseProvider {

  constructor(httpService: HttpService) {
    super(httpService);
  }

  async fetchShorts(username: string): Promise<ShortsData[]> {
    let page: number = 1;
    let hasMore: boolean = true;
    const shorts: any[] = [];
    while (hasMore) {
      const response = await firstValueFrom(
        this.httpService.get(`${config.API_PEXELS_URL}/${username}/media/popular?page=${page}`, {
          headers: { "Secret-Key": config.API_PEXELS_KEY },
        }),
      );
      const data = response.data.data || [];
      hasMore = response.data.pagination.current_page < response.data.pagination.total_pages || false;
      page++;
      shorts.push(...this.normalizeShorts(data));
    }
    return shorts;
  }
}
