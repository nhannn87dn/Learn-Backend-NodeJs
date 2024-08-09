import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql', //loại database cần sử dụng
  host: 'NHAN2', //Computer Name
  port: 1433, //cổng mặc định của sql server
  username: 'batch39',
  password: '123456789',
  database: 'BatchRN39NodeJs', //Tên Database
  entities: ['src/databases/entities/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});