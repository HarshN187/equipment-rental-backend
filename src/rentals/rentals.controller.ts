import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { getAllRentalService } from './services/getAllRentals.service';
import { getRentalByIdService } from './services/getRentalById.service';
import { GetRentalsByFilterService } from './services/getRentalByFilter.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RentalDto } from './dto/rental.dto';
import { AddRentalService } from './services/addRental.service';
import { EditRentalService } from './services/editRental.service';
import { RemoveRentalService } from './services/removeRental.service';
import { GetRentalsPaginateService } from './services/getPaginateRentals.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('rentals')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RentalsController {
  constructor(
    private readonly getAllRentalService: getAllRentalService,
    private readonly getRentalByIdService: getRentalByIdService,
    private readonly getRentalsByFilterService: GetRentalsByFilterService,
    private readonly addRentalService: AddRentalService,
    private readonly editRentalService: EditRentalService,
    private readonly removeRentalService: RemoveRentalService,
    private readonly getRentalsPaginateService: GetRentalsPaginateService,
  ) {}

  @Post()
  @Roles(['admin', 'user'])
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.addRentalService.createRental(createRentalDto);
  }

  @Get()
  @Roles(['admin'])
  getAllRentals(): Promise<RentalDto[]> {
    return this.getAllRentalService.getAll();
  }

  @Get('filter')
  @Roles(['admin'])
  @ApiQuery({ name: 'id', required: false }) // Mark id as optional
  @ApiQuery({ name: 'e_id', required: false }) // Mark e_id as optional
  findRentalByFilter(
    @Query('id') userId?: number,
    @Query('e_id') e_id?: number,
  ): Promise<RentalDto[]> {
    console.log(' binfbhd insoder controller');
    return this.getRentalsByFilterService.getRentals(
      userId ? +userId : 0,
      e_id ? +e_id : 0,
    );
  }

  @Patch(':id')
  @Roles(['admin'])
  updateRental(
    @Param('id') id: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ): Promise<RentalDto> {
    return this.editRentalService.editRental(updateRentalDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  removeRental(@Param('id') id: string): Promise<boolean> {
    return this.removeRentalService.removeRental(+id);
  }

  @Get('/paginate/:page/:perPage')
  @Roles(['admin'])
  getRentalPaginate(
    @Param('page') page: string,
    @Param('perPage') perPage: string,
    @Query('order') order: number,
  ): Promise<RentalDto[]> {
    return this.getRentalsPaginateService.getPaginateRentals(
      +page,
      +perPage,
      +order,
    );
  }

  @Get(':id')
  @Roles(['admin', 'user'])
  findRentalById(@Param('id') id: string): Promise<RentalDto> {
    return this.getRentalByIdService.getRentalById(+id);
  }
}
