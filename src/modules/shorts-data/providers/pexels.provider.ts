/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { BaseProvider } from './base.provider';
import { ShortsData } from '../../../common/dto/shorts-data.dto';

@Injectable()
export class PexelsApiProvider extends BaseProvider {

  constructor(httpService: HttpService) {
    super(httpService);
  }

  async fetchShorts(username: string): Promise<ShortsData[]> {

    const userId = await this.getUserId(username, process.env.API_PEXELS_URL, process.env.API_PEXELS_KEY);
    
    let page = 1;
    let hasMore = true;
    const shorts: ShortsData[] = [];

    while (hasMore) {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.API_PEXELS_URL}/${username}/media/popular?page=${page}`, {
          headers: { "Secret-Key": process.env.API_PEXELS_KEY },
        }),
      );
      const data = response.data.shorts || [];
      hasMore = response.data.has_more || false; // Adjust based on API response
      page++;

      shorts.push(...this.normalizeShorts(data, username, userId));
    }

    return shorts;
  }
}
