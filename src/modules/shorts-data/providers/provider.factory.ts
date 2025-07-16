/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { PexelsApiProvider } from './pexels.provider';
import { ShortsProvider } from '#root/modules/shorts-data/interfaces/provider.interface';

@Injectable()
export class ProviderFactory {

  constructor(private readonly httpService: HttpService) {}

  getProvider(providerName: string): ShortsProvider {
    switch (providerName.toLowerCase()) {
      case 'pexels':
        return new PexelsApiProvider(this.httpService);
      default:
        throw new Error(`Unsupported provider: ${providerName}`);
    }
  }
}
