import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql',
  host: 'PCNHAN',
  port: 1433,
  username: 'test',
  password: '123456789',
  database: 'Batch3738',
  entities: ['entities/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  options: {
    encrypt: false,
  },
});