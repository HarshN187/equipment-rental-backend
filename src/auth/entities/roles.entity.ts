import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesPermission } from './roles_permission.entity';
import { User } from 'src/user/entities/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Roles {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => RolesPermission, (rolePer) => rolePer.role)
  role_permission: RolesPermission[];

  @AutoMap()
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
