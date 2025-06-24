import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';

@Injectable()
export class getAllRentalService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getAll() {
    const data = await this.rentalRepo.allAsync({});

    return data;
  }
}
