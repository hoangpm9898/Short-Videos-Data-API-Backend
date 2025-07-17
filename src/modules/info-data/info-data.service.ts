/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

import { readJsonFile, writeJsonFile } from '#root/common/helpers/file.helper';
import { InfoData } from '#root/common/dto/info-data.dto';
import { ShortsDataService } from '#root/modules/shorts-data/shorts-data.service';
import { config } from '#root/config';

@Injectable()
export class InfoDataService {

  private readonly sheetId : string = config.GOOGLE_SHEET_ID;
  private readonly jsonPath = 'data/info_data.json';

  constructor(
    private readonly shortsDataService: ShortsDataService,
  ) {}

  async fetchInfoFromSheet(): Promise<InfoData[]> {
    const auth = new google.auth.GoogleAuth({
      keyFile: config.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({
      version: 'v4',
      auth: auth,
    });
    const response = await sheets.spreadsheets.values.get({
     spreadsheetId: this.sheetId,
     range: `${config.GOOGLE_SHEET_NAME}!A:D`,
    });
    const rows = response.data.values || [];
    return rows.slice(1).map((row) => ({
      id: row[0],
      status: row[1],
      username: row[2],
      total_videos: parseInt(row[3] || '0', 10),
    }));
  }

  async processInfoData(): Promise<void> {
    const infoData: InfoData[] = await this.fetchInfoFromSheet();
    const readyData: InfoData[] = infoData.filter((item) => item.status === 'ready');
    await writeJsonFile(this.jsonPath, infoData);
    for (const item of readyData) {
      const totalVideos: number = await this.shortsDataService.fetchAndStoreShorts(item.username.match(/@([^/]+)/)?.[1]);
      await this.updateInfoStatus(item.id, 'complete', totalVideos);
    }
  }

  async updateInfoStatus(id: string, status: string, totalVideos: number): Promise<void> {
    // Update Google Sheet
    const auth = new google.auth.GoogleAuth({
      keyFile: config.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({
      version: 'v4',
      auth: auth,
    });
    const infoData = await readJsonFile<InfoData>(this.jsonPath);
    const updatedData = infoData.map((item) =>
      {
        item.id === id ? { ...item, status, total_videos: totalVideos } : item;
        const index = infoData.findIndex((item) => item.id === id) + 2;
        sheets.spreadsheets.values.update({
          spreadsheetId: this.sheetId,
          range: `${config.GOOGLE_SHEET_NAME}!B${index}:D${index}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[status, item.username, totalVideos]],
          },
        });
      }
    );
    await writeJsonFile(this.jsonPath, updatedData);
  }
}
