import { Rental } from 'src/rentals/entities/rental.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column()
  phone: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
