/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Short } from '../../common/entities/short.entity';

@Injectable()
export class ApiService {

  constructor(
    @InjectRepository(Short)
    private readonly shortRepository: Repository<Short>,
  ) {}

  async getShorts(page: number, limit: number) {
    const [data, total] = await this.shortRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { page, limit, total } };
  }

  async getShortsByTags(tags: string[], page: number, limit: number) {
    const [data, total] = await this.shortRepository
      .createQueryBuilder('short')
      .where('short.tags && :tags', { tags })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, meta: { page, limit, total } };
  }

  async searchShorts(query: string, page: number, limit: number) {
    const [data, total] = await this.shortRepository.findAndCount({
      where: { description: Like(`%${query}%`) },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { page, limit, total } };
  }
}
