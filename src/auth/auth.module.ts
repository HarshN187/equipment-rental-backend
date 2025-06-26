import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/user/entities/address.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesPermissionRepository } from './repository/rolesPermission.repository';
import { Roles } from './entities/roles.entity';
import { RolesPermission } from './entities/roles_permission.entity';
import { Permissions } from './entities/permissions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      Roles,
      RolesPermission,
      Permissions,
    ]),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UserRepository, RolesPermissionRepository],
})
export class AuthModule {}
