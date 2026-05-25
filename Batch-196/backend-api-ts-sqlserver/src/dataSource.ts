import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql', //sql server
  host: 'gamepc', //Computer Name
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'Batch196_NodeJs', //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database khi o che do dev
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});