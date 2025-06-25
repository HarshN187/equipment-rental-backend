import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';

@Injectable()
export class getAllRentalService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getAll(): Promise<RentalDto[]> {
    const data = await this.rentalRepo.allAsync({});

    return data;
  }
}
