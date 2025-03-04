import { Column, Entity, ManyToOne, OneToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'nvarchar', length: 255, unique: true })
  product_name: string;

  // ----------------------------------------------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @Column({  type: 'decimal', precision: 18, scale: 2, default: 0 })
  stock: number;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
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

}
