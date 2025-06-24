import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalRepository } from './repository/rentals.repository';
import { getAllRentalService } from './services/getAllRentals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalsController],
  providers: [RentalRepository, getAllRentalService],
})
export class RentalsModule {}
