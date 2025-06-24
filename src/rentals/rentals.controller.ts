import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { getAllRentalService } from './services/getAllRentals.service';
import { getRentalByIdService } from './services/getRentalById.service';
import { GetRentalsByFilterService } from './services/getRentalByFilter.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('rentals')
export class RentalsController {
  constructor(
    private readonly getAllRentalService: getAllRentalService,
    private readonly getRentalByIdService: getRentalByIdService,
    private readonly getRentalsByFilterService: GetRentalsByFilterService,
  ) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    // return this.rentalsService.create(createRentalDto);
  }

  @Get()
  getAllRentals() {
    return this.getAllRentalService.getAll();
  }

  @Get('filter')
  @ApiQuery({ name: 'id', required: false }) // Mark id as optional
  @ApiQuery({ name: 'e_id', required: false }) // Mark e_id as optional
  findRentalByFilter(
    @Query('id') userId?: number,
    @Query('e_id') e_id?: number,
  ) {
    console.log(' binfbhd insoder controller');
    return this.getRentalsByFilterService.getRentals(
      userId ? +userId : 0,
      e_id ? +e_id : 0,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    // return this.rentalsService.update(+id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.rentalsService.remove(+id);
  }

  @Get(':id')
  findRentalById(@Param('id') id: string) {
    return this.getRentalByIdService.getRentalById(+id);
  }
}
