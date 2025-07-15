/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { google } from 'googleapis';

import { readJsonFile, writeJsonFile } from '../../common/helpers/file.helper';
import { InfoData } from '../../common/dto/info-data.dto';
import { ShortsDataService } from '../shorts-data/shorts-data.service';

@Injectable()
export class InfoDataService {

  private readonly sheetId = process.env.GOOGLE_SHEET_ID;
  private readonly jsonPath = 'data/info_data.json';

  constructor(
    private readonly httpService: HttpService,
    private readonly shortsDataService: ShortsDataService,
  ) {}

  async fetchInfoFromSheet(): Promise<InfoData[]> {

    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: `${process.env.GOOGLE_SHEET_NAME}!A:D`,
    });

    const rows = response.data.values || [];
    const infoData: InfoData[] = rows.slice(1).map((row) => ({
      id: row[0],
      status: row[1],
      username: row[2],
      total_videos: parseInt(row[3] || '0', 10),
    }));

    return infoData;
  }

  async processInfoData(): Promise<void> {

    const infoData = await this.fetchInfoFromSheet();
    const readyData = infoData.filter((item) => item.status === 'ready');
    await writeJsonFile(this.jsonPath, infoData);

    for (const item of readyData) {
      const totalVideos = await this.shortsDataService.fetchAndStoreShorts(item.username);
      await this.updateInfoStatus(item.id, 'complete', totalVideos);
    }
  }

  async updateInfoStatus(id: string, status: string, totalVideos: number): Promise<void> {

    const infoData = await readJsonFile<InfoData>(this.jsonPath);
    const updatedData = infoData.map((item) =>
      item.id === id ? { ...item, status, total_videos: totalVideos } : item,
    );
    await writeJsonFile(this.jsonPath, updatedData);

    // Update Google Sheet
    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const index = infoData.findIndex((item) => item.id === id) + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: this.sheetId,
      range: `${process.env.GOOGLE_SHEET_NAME}!C${index}:D${index}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status, totalVideos]] },
    });
  }
}
