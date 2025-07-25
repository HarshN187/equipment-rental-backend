import { Rental } from 'src/rentals/entities/rental.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { AutoMap } from '@automapper/classes';
import { Roles } from 'src/auth/entities/roles.entity';

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  user_id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column()
  phone: string;

  @AutoMap()
  @Column({
    nullable: true,
  })
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
