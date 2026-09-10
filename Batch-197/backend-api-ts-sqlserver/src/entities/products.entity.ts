import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { Category } from './categories.entity';


@Entity('products')
@Check(`"price" >= 0`)
@Check(`"discount" BETWEEN 0 AND 70`)
@Check(`"stock" >= 0`)
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'product_name', type: 'nvarchar', length: 255, unique: true })
  productName!: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount!: number;

  //Quan hệ NHIỀU MỘT
  @ManyToOne(() => Category,)
  @JoinColumn({ name: 'id' })
  category!: Category;

//   @ManyToOne(() => Brand)
//   @JoinColumn({ name: 'id' })
//   brand: Brand;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true, default: null })
  description!: string;

  @Column({ name: 'model_year', type: 'smallint' })
  modelYear!: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail!: string;

  @Column({ type: 'smallint', default: 0 })
  stock!: number;
}