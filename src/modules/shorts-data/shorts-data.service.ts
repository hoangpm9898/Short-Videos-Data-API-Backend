/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ProviderFactory } from './providers/provider.factory';
import { ShortsProvider } from './interfaces/provider.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortData, ShortDataDocument } from '#root/common/schema/shorts-data.schema';
import { ShortsData } from '#root/common/dto/shorts-data.dto';
import { CursorHelper } from '#root/common/helpers/cursor.helper';

@Injectable()
export class ShortsDataService {

  constructor(
    @InjectModel(ShortData.name)
    private readonly shortDataDocumentModel: Model<ShortDataDocument>,
    private readonly providerFactory: ProviderFactory,
  ) {}

  async fetchAndStoreShorts(username: string, providerName: string = 'pexels'): Promise<number> {
    const provider: ShortsProvider = this.providerFactory.getProvider(providerName);
    const shorts: ShortsData[] = await provider.fetchShorts(username);
    await this.shortDataDocumentModel.insertMany(shorts);
    return shorts.length;
  }

  async getShorts(cursor?: string, limit = 10) {
    const offset = cursor ? CursorHelper.decodeCursor(cursor)?.offset || 0 : 0;
    
    const [data, total] = await Promise.all([
      this.shortDataDocumentModel
        .find()
        .skip(offset)
        .limit(limit)
        .lean(),
      this.shortDataDocumentModel.countDocuments(),
    ]);

    return {
      data,
      pagination: CursorHelper.createPaginationMeta(offset, limit, total),
    };
  }

  async getShortsByTags(tags: string[], cursor?: string, limit = 10) {
    const offset = cursor ? CursorHelper.decodeCursor(cursor)?.offset || 0 : 0;
    const filter = { tags: { $all: tags } };
    const [data, total] = await Promise.all([
      this.shortDataDocumentModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .lean(),
      this.shortDataDocumentModel.countDocuments(filter),
    ]);
    return {
      data,
      pagination: CursorHelper.createPaginationMeta(offset, limit, total),
    };
  }

  async searchShorts(query: string, cursor?: string, limit = 10) {
    const offset = cursor ? CursorHelper.decodeCursor(cursor)?.offset || 0 : 0;
    const filter = { description: { $regex: query, $options: 'i' } };
    const [data, total] = await Promise.all([
      this.shortDataDocumentModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .lean(),
      this.shortDataDocumentModel.countDocuments(filter),
    ]);
    return {
      data,
      pagination: CursorHelper.createPaginationMeta(offset, limit, total),
    };
  }

}