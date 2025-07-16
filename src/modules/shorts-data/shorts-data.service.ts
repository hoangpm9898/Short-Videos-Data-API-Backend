/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Short } from '#root/common/entities/short.entity';
import { ProviderFactory } from './providers/provider.factory';
import { ShortsData } from '#root/common/dto/shorts-data.dto';
import { ShortsProvider } from './interfaces/provider.interface';

@Injectable()
export class ShortsDataService {

  constructor(
    @InjectRepository(Short)
    private readonly shortRepository: Repository<Short>,
    private readonly providerFactory: ProviderFactory,
  ) {}

  async fetchAndStoreShorts(username: string, providerName: string = 'pexels'): Promise<number> {

    const provider: ShortsProvider = this.providerFactory.getProvider(providerName);
    const shorts: ShortsData[] = await provider.fetchShorts(username);
    
    const entities = shorts.map((short) => ({
      short_id: short.short_id,
      user_id: short.user_id,
      username: short.username,
      description: short.description,
      tags: short.tags || [],
      created_at: new Date(short.created_at),
      url: short.url,
    }));

    await this.shortRepository.save(entities);
    
    return entities.length;
  }
}
