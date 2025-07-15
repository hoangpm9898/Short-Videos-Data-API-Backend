/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfoDataService } from './info-data.service';

@Injectable()
export class InfoDataScheduler {
  
  constructor(private readonly infoDataService: InfoDataService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('\n**** Fetching info data from Google Sheet...');
    await this.infoDataService.processInfoData();
  }
}
