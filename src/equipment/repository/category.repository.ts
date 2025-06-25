import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { Category } from '../entities/category.entity';
import { categoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryRepository extends BaseRepo<
  Category,
  categoryDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(categoryRepository, mapper, logger, Category, categoryDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof Category {
    return 'deleted_at';
  }

  public override get idColumnName(): keyof Category {
    return 'category_id';
  }
}
