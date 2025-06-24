import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';

@Injectable()
export class getRentalByIdService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getRentalById(id: number) {
    const data = await this.rentalRepo.getAsyncWithJoin(id, {
      user: true,
      equipment: true,
    });

    return data;
  }
}
