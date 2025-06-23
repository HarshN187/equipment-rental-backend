import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalsModule } from './rentals/rentals.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './db-config/data-source';

@Module({
  imports: [
    UserModule,
    EquipmentModule,
    RentalsModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
