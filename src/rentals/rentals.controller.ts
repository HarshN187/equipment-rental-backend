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
import { RentalDto } from './dto/rental.dto';
import { AddRentalService } from './services/addRental.service';
import { EditRentalService } from './services/editRental.service';

@Controller('rentals')
export class RentalsController {
  constructor(
    private readonly getAllRentalService: getAllRentalService,
    private readonly getRentalByIdService: getRentalByIdService,
    private readonly getRentalsByFilterService: GetRentalsByFilterService,
    private readonly addRentalService: AddRentalService,
    private readonly editRentalService: EditRentalService,
  ) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.addRentalService.createRental(createRentalDto);
  }

  @Get()
  getAllRentals(): Promise<RentalDto[]> {
    return this.getAllRentalService.getAll();
  }

  @Get('filter')
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
  updateRental(
    @Param('id') id: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    return this.editRentalService.editRental(updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.rentalsService.remove(+id);
  }

  @Get(':id')
  findRentalById(@Param('id') id: string): Promise<RentalDto> {
    return this.getRentalByIdService.getRentalById(+id);
  }
}
