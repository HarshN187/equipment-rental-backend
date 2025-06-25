import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class getAllRentalService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getAll(): Promise<RentalDto[]> {
    const data = await this.rentalRepo.allAsync({});

    if (!data) {
      throw new DbException('data not found');
    }
    return data;
  }
}
