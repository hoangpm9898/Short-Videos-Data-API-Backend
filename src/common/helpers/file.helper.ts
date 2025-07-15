/* eslint-disable prettier/prettier */

import * as fs from 'fs/promises';

export async function readJsonFile<T>(path: string): Promise<T[]> {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    return [];
  }
}

export async function writeJsonFile<T>(path: string, data: T[]): Promise<void> {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}
