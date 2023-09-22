import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  firstName: string;

  @Column({ length: 20, nullable: false })
  lastName: string;

  @Column({ length: 120, nullable: false })
  numberPhone: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 50, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ length: 255, nullable: false })
  password: string;
}
