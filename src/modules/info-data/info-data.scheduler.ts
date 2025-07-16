/* eslint-disable prettier/prettier */

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfoDataService } from './info-data.service';

@Injectable()
export class InfoDataScheduler {
  
  constructor(private readonly infoDataService: InfoDataService) {}
  private readonly logger = new Logger(InfoDataScheduler.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log('\n**** Fetching info data from Google Sheet...');
    await this.infoDataService.processInfoData();
  }
}
