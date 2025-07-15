/* eslint-disable prettier/prettier */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Short } from '../entities/short.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [Short],
  synchronize: process.env.NODE_ENV !== 'PROD',
};
