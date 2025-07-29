import { Column, Entity, ManyToOne, OneToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category.entity';
import { Brand } from './Brand.entity';
import { IsDecimal, IsInt, Max, Min } from 'class-validator';


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
  @IsDecimal()
  @Min(0)
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @IsDecimal()
  @Min(0)
  @Max(70)
  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @IsInt()
  @Min(0)
  @Column({  type: 'smallint', default: 0 })
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
