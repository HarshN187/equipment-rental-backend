import { AutoMap } from '@automapper/classes';
import { Rental } from 'src/rentals/entities/rental.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Equipment {
  @AutoMap()
  @PrimaryGeneratedColumn()
  e_id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  rent_per_day: number;

  @AutoMap()
  @Column()
  total_quntity: number;

  @AutoMap()
  @Column()
  available_quntity: number;

  @AutoMap()
  @Column()
  available: boolean;

  @AutoMap()
  @ManyToOne(() => Category, (category) => category.equipments)
  category: Category;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Rental, (rental) => rental.equipment)
  Rentals: Rental[];
}
