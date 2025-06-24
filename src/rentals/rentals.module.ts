import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalRepository } from './repository/rentals.repository';
import { getAllRentalService } from './services/getAllRentals.service';
import { getRentalByIdService } from './services/getRentalById.service';
import { GetRentalsByFilterService } from './services/getRentalByFilter.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { User } from 'src/user/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { EquipmentRepository } from 'src/equipment/repository/equipment.repository';
import { AddRentalService } from './services/addRental.service';
import { EditRentalService } from './services/editRental.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, User, Equipment])],
  controllers: [RentalsController],
  providers: [
    RentalRepository,
    getAllRentalService,
    getRentalByIdService,
    GetRentalsByFilterService,
    UserRepository,
    EquipmentRepository,
    AddRentalService,
    EditRentalService,
  ],
})
export class RentalsModule {}
