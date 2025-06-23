import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
