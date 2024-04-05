import { Column, Entity, ManyToOne, OneToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './Category.entity';
import { Brand } from './Brand.entity';
import { Photo } from './Photo.entity';
@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Name', type: 'nvarchar', length: 255 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Price', type: 'decimal', precision: 18, scale: 2 })
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Stock', type: 'decimal', precision: 18, scale: 2, default: 0 })
  stock: number;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;
  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @ManyToOne(() => Category, (c) => c.products, {
    onDelete: 'SET NULL'
  })
  category: Category;
  //tao ra field categoryId

  @ManyToOne(() => Brand, (s) => s.products)
  brand: Brand;

  @OneToMany(()=>Photo, (p)=> p.product)
  photos: Photo[]

}
