
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'PCNHAN',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'NodeJsTest', //NodeJsTest | AptechTest
  entities: ['src/entities/**/*.entity{.ts,.js}', 'src/entities/**/*.schema{.ts,.js}'],
  synchronize: true, //True Nếu bạn có chưa tạo một table nào, False nếu Database có Table tồn tại
  logging: true,
  options: {
    encrypt: false,
  },
});