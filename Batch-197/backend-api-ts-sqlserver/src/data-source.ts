import "reflect-metadata";
import { DataSource } from 'typeorm';
import {ENV} from './config/env'

export const myDataSource = new DataSource({
  type: ENV.DB.TYPE as 'mssql', // loại DB cần kết nối
  host: ENV.DB.HOST, //Computer Name, production thì là IP của DB sever
  port: ENV.DB.PORT, //Port của DB
  username: ENV.DB.USER_NAME,
  password: ENV.DB.PASS,
  database: ENV.DB.NAME, //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: ENV.DB.SYNCHRONIZE, //Đồng bộ với Database true khi dev, false khi production
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});