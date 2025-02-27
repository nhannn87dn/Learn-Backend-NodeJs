import "reflect-metadata";
import { DataSource } from 'typeorm';

/*
Đọc doc tương ứng với kiểu database bạn muốn kết nối
https://typeorm.io/data-source-options
*/
export const myDataSource = new DataSource({
  type: 'mssql', //Loại database
  host: 'NHANPC', //Computer Name /IP server
  port: 1433, //cổng mặc định của server database
  username: 'nhan', //username database
  password: '123456789', // mk database
  database: 'Batch40NodeJs', //Tên Database
  entities: ['entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});