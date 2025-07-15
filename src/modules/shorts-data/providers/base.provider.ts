/* eslint-disable prettier/prettier */

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { ShortsProvider } from '../interfaces/provider.interface';
import { ShortsData } from '../../../common/dto/shorts-data.dto';

export abstract class BaseProvider implements ShortsProvider {

  constructor(protected readonly httpService: HttpService) {}

  abstract fetchShorts(username: string): Promise<ShortsData[]>;

  protected async getUserId(username: string, apiUrl: string, apiKey: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.get(`${apiUrl}/${username}`, {
        headers: { "Secret-Key": apiKey },
      }),
    );
    return response.data.user_id;
  }

  protected normalizeShorts(data: any[], username: string, userId: string): ShortsData[] {
    return data.map((item) => ({
      short_id: item.id,
      user_id: userId,
      username,
      description: item.description || '',
      tags: item.tags || [],
      created_at: new Date(item.created_at),
      url: item.url,
    }));
  }
}
