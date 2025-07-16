/* eslint-disable prettier/prettier */

import { ShortsData } from '#root/common/dto/shorts-data.dto';

export interface ShortsProvider {
  fetchShorts(username: string): Promise<ShortsData[]>;
}
