import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { categoryDto } from '../dto/category.dto';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class GetAllCategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAll(): Promise<categoryDto[]> {
    const result = await this.categoryRepo.allAsync({});

    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
