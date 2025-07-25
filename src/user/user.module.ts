import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetUserByIdService } from './services/getUserById.service';
import { UserRepository } from './repository/user.repository';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { classes } from '@automapper/classes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';
import { AddressRepository } from './repository/address.repository';
import { GetUserAddressesService } from './services/getUserAddresses.service';
import { GetAllUserService } from './services/getAllUsers.service';
import { EditUserService } from './services/updateUser.service';
import { mapperProfile } from 'src/common/profiles/mapper.profile';
import { CreateUserService } from './services/createUser.service';
import { addAddressService } from './services/addUserAddress.service';
import { DeleteUserService } from './services/deleteUser.service';
import { DeleteAddressService } from './services/deleteAddress.service';
import { GetUserPaginationService } from './services/getUserPagination.service';
import { FindUserBySearchService } from './services/findUserBySearch.service';
import { Permissions } from 'src/auth/entities/permissions.entity';
import { Roles } from 'src/auth/entities/roles.entity';
import { RolesPermission } from 'src/auth/entities/roles_permission.entity';
import { RolesPermissionRepository } from 'src/auth/repository/rolesPermission.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      RolesPermission,
      Roles,
      Permissions,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            // ignore: 'pid,hostname',
          },
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    AddressRepository,
    GetUserByIdService,
    GetUserAddressesService,
    GetAllUserService,
    EditUserService,
    mapperProfile,
    CreateUserService,
    addAddressService,
    DeleteUserService,
    DeleteAddressService,
    GetUserPaginationService,
    FindUserBySearchService,
    RolesPermissionRepository,
  ],
  exports: [UserRepository, AddressRepository],
})
export class UserModule {}
