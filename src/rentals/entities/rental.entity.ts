import { AutoMap } from '@automapper/classes';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rental {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  @AutoMap()
  @ManyToOne(() => Equipment, (equipment) => equipment.Rentals)
  equipment: Equipment;

  @AutoMap()
  @Column()
  start_date: Date;

  @AutoMap()
  @Column()
  end_date: Date;

  @AutoMap()
  @Column({ default: 'active' }) //active,returned,overdue(not returned)
  status: string;

  @AutoMap()
  @Column({ default: 'unpaid' }) //paid,unpaid
  payment_status: string;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @DeleteDateColumn()
  deleted_at: Date;
}
