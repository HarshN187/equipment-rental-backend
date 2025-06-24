import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { EquipmentRepository } from 'src/equipment/repository/equipment.repository';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { UpdateRentalDto } from '../dto/update-rental.dto';

@Injectable()
export class EditRentalService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    private readonly userRepo: UserRepository,
    private readonly equipmentRepo: EquipmentRepository,
  ) {}

  async editRental(body: UpdateRentalDto): Promise<RentalDto> {
    const userData = body.user ? await this.userRepo.getAsync(body.user) : {};

    const equipData = body.equipment
      ? await this.equipmentRepo.getAsync(body.equipment)
      : {};

    const data = await this.rentalRepo.updateAsync({
      ...body,
      user: userData,
      equipment: equipData,
    } as unknown as RentalDto);

    return data;
  }
}
