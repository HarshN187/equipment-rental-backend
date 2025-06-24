import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalRepository } from './repository/rentals.repository';
import { getAllRentalService } from './services/getAllRentals.service';
import { getRentalByIdService } from './services/getRentalById.service';
import { GetRentalsByFilterService } from './services/getRentalByFilter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalsController],
  providers: [
    RentalRepository,
    getAllRentalService,
    getRentalByIdService,
    GetRentalsByFilterService,
  ],
})
export class RentalsModule {}
