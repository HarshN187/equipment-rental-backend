import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalsModule } from './rentals/rentals.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './db-config/data-source';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { UserRepository } from './user/repository/user.repository';
import { User } from './user/entities/user.entity';
import { Address } from './user/entities/address.entity';
import { Equipment } from './equipment/entities/equipment.entity';
import { Category } from './equipment/entities/category.entity';
import { Rental } from './rentals/entities/rental.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User, Address, Equipment, Category, Rental]),
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
    UserModule,
    EquipmentModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
