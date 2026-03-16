import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql', // Loại Database: mysql, postgresql, sqlite, mssql, oracle, mongodb
  host: 'laptopnhan', //Computer Name
  port: 1433, //Cổng kết nối mặc định của SQL Server
  username: 'nhan', //Tên đăng nhập SQL Server
  password: '123456789', //Mật khẩu SQL Server
  database: 'NodeJS_Batch195', //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database, chỉ dùng khi dev
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});