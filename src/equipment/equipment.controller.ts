import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { GetAllEquipmentService } from './services/getAllEquipments.service';
import { GetEquipmentbyIdService } from './services/getEquipById.service';
import { GetAllCategoryService } from './services/getAllCategory.service';
import { AddEquipmentService } from './services/addEquipment.service';
import { EquipmentDto } from './dto/equipment.dto';
import { categoryDto } from './dto/category.dto';
import { editEquipmentService } from './services/editEquipment.service';
import { RemoveEquipmentService } from './services/removeEquipment.service';
import { GetPaginateEquipmentService } from './services/getPaginatEquipment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('equipment')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EquipmentController {
  constructor(
    private readonly getAllEquipService: GetAllEquipmentService,
    private readonly getEquipByIdService: GetEquipmentbyIdService,
    private readonly getAllCategoryService: GetAllCategoryService,
    private readonly addEquipmentService: AddEquipmentService,
    private readonly editEquipService: editEquipmentService,
    private readonly removeEquipService: RemoveEquipmentService,
    private readonly getPaginateEquipService: GetPaginateEquipmentService,
  ) {}

  @Post()
  @Roles(['admin'])
  addEquipment(
    @Body() createEquipmentDto: CreateEquipmentDto,
  ): Promise<EquipmentDto> {
    return this.addEquipmentService.addEquipment(createEquipmentDto);
  }

  @Get()
  @Roles(['admin', 'user'])
  findAllEquipment(): Promise<EquipmentDto[]> {
    return this.getAllEquipService.getAllEquipments();
  }

  @Get(':page/:perPage')
  @Roles(['admin', 'user'])
  findPaginatEquipment(
    @Param('page') page: string,
    @Param('perPage') perPage: string,
  ): Promise<EquipmentDto[]> {
    return this.getPaginateEquipService.getPaginateEquipments(+page, +perPage);
  }

  @Get('/category')
  @Roles(['admin', 'user'])
  findAllCategory(): Promise<categoryDto[]> {
    return this.getAllCategoryService.getAll();
  }

  @Get(':id')
  @Roles(['admin', 'user'])
  findOneEquipment(@Param('id') id: string): Promise<EquipmentDto> {
    return this.getEquipByIdService.getEquipment(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  updateEquipment(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentDto> {
    return this.editEquipService.editEquipment(updateEquipmentDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string): Promise<boolean> {
    return this.removeEquipService.RemoveEquipment(+id);
  }
}
