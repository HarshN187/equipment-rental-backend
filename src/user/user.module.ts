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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '60s' },
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
    GetUserByIdService,
    GetUserAddressesService,
    UserRepository,
    AddressRepository,
  ],
  exports: [UserRepository, AddressRepository],
})
export class UserModule {}
