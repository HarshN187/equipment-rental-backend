import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { GetAllEquipmentService } from './services/getAllEquipments.service';
import { GetEquipmentbyIdService } from './services/getEquipById.service';
import { GetAllCategoryService } from './services/getAllCategory.service';
import { AddEquipmentService } from './services/addEquipment.service';
import { editEquipmentService } from './services/editEquipment.service';
import { RemoveEquipmentService } from './services/removeEquipment.service';
import { GetPaginateEquipmentService } from './services/getPaginatEquipment.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permission } from 'src/common/decorators/permission.decorator';
import { FindEquipmentBySearchService } from './services/searchEquipment.service';
import { GetEquipmentResDto } from './dto/getEquipmentRes.dto';
import { GetCategoryResDto } from './dto/getCategoryRes.dto';
import { AddCategoryService } from './services/addCategory.service';
import { createCategoryDto } from './dto/creare-category.dto';

@Controller('equipment')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class EquipmentController {
  constructor(
    private readonly getAllEquipService: GetAllEquipmentService,
    private readonly getEquipByIdService: GetEquipmentbyIdService,
    private readonly getAllCategoryService: GetAllCategoryService,
    private readonly addEquipmentService: AddEquipmentService,
    private readonly editEquipService: editEquipmentService,
    private readonly removeEquipService: RemoveEquipmentService,
    private readonly getPaginateEquipService: GetPaginateEquipmentService,
    private readonly searchEquipmentService: FindEquipmentBySearchService,
    private readonly addCategoryService: AddCategoryService,
  ) {}

  @Post()
  // @Permission(['admin'])
  @Permission(['addEquipment'])
  addEquipment(
    @Body() createEquipmentDto: CreateEquipmentDto,
  ): Promise<GetEquipmentResDto> {
    return this.addEquipmentService.addEquipment(createEquipmentDto);
  }

  @Get()
  // @Permission(['admin', 'user'])
  @Permission(['findAllEquipment'])
  @ApiQuery({ name: 'available', required: false }) // Mark id as optional
  findAllEquipment(
    @Query('available') status: number,
  ): Promise<GetEquipmentResDto[]> {
    return this.getAllEquipService.getAllEquipments(+status);
  }

  @Get(':page/:perPage')
  // @Permission(['admin', 'user'])
  @Permission(['findPaginatEquipment'])
  findPaginatEquipment(
    @Param('page') page: string,
    @Param('perPage') perPage: string,
    @Query('order') order: number,
  ): Promise<GetEquipmentResDto[]> {
    return this.getPaginateEquipService.getPaginateEquipments(
      +page,
      +perPage,
      +order,
    );
  }

  @Get('/category')
  // @Permission(['admin', 'user'])
  @Permission(['findAllCategory'])
  findAllCategory(): Promise<GetCategoryResDto[]> {
    return this.getAllCategoryService.getAll();
  }

  @Get('search')
  // @Permission(['user', 'admin'])
  @Permission(['searchEquipment'])
  searchEquipment(
    @Query('query') query: string,
  ): Promise<GetEquipmentResDto[]> {
    return this.searchEquipmentService.findEquipment(query);
  }

  @Post('category')
  addCategory(@Body() body: createCategoryDto) {
    return this.addCategoryService.addEquipment(body);
  }

  @Get(':id')
  // @Permission(['admin', 'user'])
  @Permission(['findOneEquipment'])
  findOneEquipment(@Param('id') id: string): Promise<GetEquipmentResDto> {
    return this.getEquipByIdService.getEquipment(+id);
  }

  @Patch('')
  // @Permission(['admin'])
  @Permission(['updateEquipment'])
  updateEquipment(
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<GetEquipmentResDto> {
    return this.editEquipService.editEquipment(updateEquipmentDto);
  }

  @Delete(':id')
  // @Permission(['admin'])
  @Permission(['removeEquip'])
  remove(@Param('id') id: string): Promise<boolean> {
    return this.removeEquipService.RemoveEquipment(+id);
  }
}
