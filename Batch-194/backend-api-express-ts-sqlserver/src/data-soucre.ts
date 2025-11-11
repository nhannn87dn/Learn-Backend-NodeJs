import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql',// Kiểu database
  host: 'laptopnhan', //Computer Name
  port: 1433, //Cổng kết nối mặc định của sql server
  username: 'nhan',
  password: '123456789',
  database: 'Batch194', //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database khi code local, không dùng cho production
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});