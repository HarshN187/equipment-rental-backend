import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Permissions } from './permissions.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
@Unique('Roles_Permission', ['role', 'permission'])
export class RolesPermission {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @ManyToOne(() => Roles, (roles) => roles.role_permission)
  role: Roles;

  @AutoMap()
  @ManyToOne(() => Permissions, (perm) => perm.role_permission)
  permission: Permissions;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
