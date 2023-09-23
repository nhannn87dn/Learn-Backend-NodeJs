import 'reflect-metadata';
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'PCNHAN',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'AptectTest',
  entities: ['src/entities/**/*.entity{.ts,.js}', 'src/entities/**/*.schema{.ts,.js}'],
  synchronize: true,
  logging: true,
  options: {
    encrypt: false,
  },
});