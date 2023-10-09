import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from './src/entities/category.entity';
import { Supplier } from './src/entities/supplier.entity';
import { Customer } from './src/entities/customer.entity';
import { Employee } from './src/entities/employee.entity';
import { Product } from './src/entities/product.entity';
import { Order } from './src/entities/order.entity';
import { OrderDetail } from './src/entities/order-details.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'NHAN2',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'OnlineShop',
  // entities: ['entities/**/*.entity{.ts,.js}', 'entities/**/*.schema{.ts,.js}'],
  entities: [Category, Supplier, Customer, Employee, Product, Order, OrderDetail],
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
  },
});

// export const AppDataSource = new DataSource({
//   type: 'mssql',
//   host: '113.160.224.121',
//   port: 1433,
//   username: 'developer',
//   password: 'developer',
//   database: 'TypeOrm',
//   // entities: ['entities/**/*.entity{.ts,.js}', 'entities/**/*.schema{.ts,.js}'],
//   entities: [Category, Supplier, Customer, Employee, Product, Order, OrderDetail],
//   synchronize: true,
//   logging: false,
//   options: {
//     encrypt: false,
//   },
// });