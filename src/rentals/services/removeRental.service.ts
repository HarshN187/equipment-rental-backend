import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class RemoveRentalService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async removeRental(id: number): Promise<boolean> {
    const data = await this.rentalRepo.deleteAsync(id);

    if (!data) {
      throw new DbException('data not found');
    }

    return data;
  }
}
