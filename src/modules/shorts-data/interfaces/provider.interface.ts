/* eslint-disable prettier/prettier */

import { ShortsData } from '../../../common/dto/shorts-data.dto';

export interface ShortsProvider {
  fetchShorts(username: string): Promise<ShortsData[]>;
}
