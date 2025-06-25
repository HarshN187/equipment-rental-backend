import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { VeryfyTokenMiddleware } from './common/middleware/verifyToken.middleware';

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
    UserModule,
    EquipmentModule,
    RentalsModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(VeryfyTokenMiddleware)
    //   .exclude({ path: 'user', method: RequestMethod.POST })
    //   .forRoutes('user', 'equipment', 'rentals');
  }
}
