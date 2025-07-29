import "reflect-metadata";
import { DataSource } from 'typeorm';
import { env } from "./helpers/env.helper";

export const myDataSource = new DataSource({
  type: 'mssql', //loại database
  host: 'NHANPC', //Computer Name
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'Batch194', //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: env.NODE_ENV === 'development', //Đồng bộ với Database
  logging: env.NODE_ENV === 'development', //ghi log
  options: {
    encrypt: env.NODE_ENV === 'production', //True khi chạy trên production
  },
});