import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { categoryDto } from '../dto/category.dto';

@Injectable()
export class GetAllCategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAll(): Promise<categoryDto[]> {
    const result = await this.categoryRepo.allAsync({});

    return result;
  }
}
