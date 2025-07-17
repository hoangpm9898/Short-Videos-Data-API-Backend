/* eslint-disable prettier/prettier */

import { HttpService } from '@nestjs/axios';

import { ShortsProvider } from '../interfaces/provider.interface';
import { ShortsData, VideoData } from '#root/common/dto/shorts-data.dto';
import { firstValueFrom } from 'rxjs';

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

  protected normalizeShorts(data: any[]): ShortsData[] {
    return data.map((item) => ({
      _id: item.id,
      user: {
        id: item.attributes.user.id,
        username: item.attributes.user.username,
        first_name: item.attributes.user.first_name || '',
        last_name: item.attributes.user.last_name || '',
        slug: item.attributes.user.slug || '',
        location: item.attributes.user.location || '',
        avatar: {
          small: item.attributes.user.avatar.small || '',
          medium: item.attributes.user.avatar.medium || '',
          large: item.attributes.user.avatar.large || '',
        },
        hero: item.attributes.user.hero || false,
      },
      title: item.attributes.title || '',
      description: item.attributes.description || '',
      tags: item.attributes.tags || [],
      video: this.getBestQualityVideo(item.attributes.video),
      provider: item.attributes.license || '',
    }));
  }

  protected getBestQualityVideo(video: any): VideoData {
    const videoFiles = video?.video_files ?? [];
    return videoFiles
      .filter(v => v.file_type === 'video/mp4')
      .sort((a, b) => {
        return b.width * b.height - a.width * a.height;
      })[0];
  }
}
