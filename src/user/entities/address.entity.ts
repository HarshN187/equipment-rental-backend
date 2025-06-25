import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Address {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  address: string;

  @AutoMap()
  @Column()
  city: string;

  @AutoMap()
  @Column()
  state: string;

  @AutoMap()
  @Column()
  country: string;

  @AutoMap()
  @Column()
  zipcode: string;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @DeleteDateColumn()
  deleted_at: Date;

  @AutoMap()
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
