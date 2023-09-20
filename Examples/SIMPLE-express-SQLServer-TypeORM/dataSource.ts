require('dotenv').config();
import 'reflect-metadata';

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'NHAN2',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'myTest',
  entities: ['src/entities/**/*.entity{.ts,.js}', 'src/entities/**/*.schema{.ts,.js}'],
  synchronize: true,
  logging: true,
  options: {
    encrypt: false,
  },
});