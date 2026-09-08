import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'nvarchar',
    length: 50,
    unique: true,
  })
  category_name!: string;

  @Column({
    type: 'nvarchar',
    length: 500,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    unique: true,
  })
  slug!: string;
}

