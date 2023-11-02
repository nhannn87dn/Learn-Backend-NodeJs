import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql',
  host: 'NHAN2',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'ExpressSQLServer34',
  entities: ['entities/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  options: {
    encrypt: false,
  },
});