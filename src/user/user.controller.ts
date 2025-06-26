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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdService } from './services/getUserById.service';
import { GetUserAddressesService } from './services/getUserAddresses.service';
import { AddressDto } from './dto/address.dto';
import { UserDto } from './dto/user.dto';
import { GetAllUserService } from './services/getAllUsers.service';
import { EditUserService } from './services/updateUser.service';
import { CreateUserService } from './services/createUser.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { addAddressService } from './services/addUserAddress.service';
import { DeleteUserService } from './services/deleteUser.service';
import { DeleteAddressService } from './services/deleteAddress.service';
import { GetUserPaginationService } from './services/getUserPagination.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from 'src/common/decorators/permission.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FindUserBySearchService } from './services/findUserBySearch.service';
import { GetUserResDto } from './dto/getUserRes.dto';
import { GetAddressResDto } from './dto/getAddress.dto';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUserAddressService: GetUserAddressesService,
    private readonly getAllUserService: GetAllUserService,
    private readonly editUserService: EditUserService,
    private readonly createUserService: CreateUserService,
    private readonly addAddressService: addAddressService,
    private readonly deleteUserService: DeleteUserService,
    private readonly deleteAddressService: DeleteAddressService,
    private readonly getUserPagination: GetUserPaginationService,
    private readonly findUserWithSearch: FindUserBySearchService,
  ) {}

  @Post()
  // @Permission(['user'])
  create(@Body() createUserDto: CreateUserDto): Promise<GetUserResDto> {
    return this.createUserService.createUser(createUserDto);
  }

  @Post('address')
  @Permission(['addAddress'])
  addAddress(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<GetAddressResDto> {
    return this.addAddressService.createAddress(createAddressDto);
  }

  @Get()
  @Permission(['findAllUser'])
  findAllUser(): Promise<GetUserResDto[]> {
    return this.getAllUserService.getAllUser();
  }

  @Get('/:id/address')
  @Permission(['getUserAddresses'])
  getUserAddresses(@Param('id') userId: string): Promise<GetAddressResDto[]> {
    return this.getUserAddressService.getUserAddresses(+userId);
  }

  @Get('/pagination/:perPage/:page')
  @Permission(['getUserPagination'])
  getUserWithPagination(
    @Param('perPage') perPage: string,
    @Param('page') page: string,
    @Query('order') order: number,
  ): Promise<GetUserResDto[]> {
    return this.getUserPagination.getUserPagination(+page, +perPage, +order);
  }

  @Patch()
  @Permission(['updateUser'])
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<GetUserResDto> {
    return this.editUserService.editUser(updateUserDto);
  }

  @Delete(':id')
  // @Permission(['user', 'admin'])
  @Permission(['deleteUser'])
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.deleteUserService.deleteUser(+id);
  }

  @Delete('address/:id')
  // @Permission(['user'])
  @Permission(['deleteAddress'])
  deleteAddress(@Param('id') id: string): Promise<boolean> {
    return this.deleteAddressService.deleteAddress(+id);
  }

  @Get('search')
  // @Permission(['admin'])
  @Permission(['findUserBySearch'])
  findUserBySearch(@Query('query') query: string): Promise<GetUserResDto[]> {
    return this.findUserWithSearch.findUser(query);
  }

  @Get(':id')
  // @Permission(['user', 'admin'])
  @Permission(['findOneUserWithDetails'])
  findOneUserWithDetails(@Param('id') userId: string): Promise<GetUserResDto> {
    return this.getUserByIdService.getUserById(+userId);
  }
}
