import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAddressDto } from './dto/createAddress.dto';
import { CreateEntityAddress } from './address.entities';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { AddressService } from './address.service';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create new address' })
  @ApiOkResponse({ status: 200, description: 'Successfully created' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({ summary: 'Update address by ID' })
  @ApiOkResponse({ status: 200, description: 'Address updated successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Incorrect request arguments',
  })
  @ApiNotFoundResponse({ description: 'Nonexistent address' })
  @Put(':addressId')
  updateAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(addressId, updateAddressDto);
  }

  @ApiOperation({ summary: 'Get address by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully got',
    type: CreateEntityAddress,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Nonexistent address' })
  @Get(':addressId')
  async getAddressById(@Param('addressId', ParseIntPipe) addressId: number) {
    return await this.addressService.getAddressById(addressId);
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({
    description: 'All addresses have been found',
    type: [CreateEntityAddress],
  })
  @ApiNotFoundResponse({ description: 'No addresses in the system' })
  @Get()
  findAll() {
    return this.addressService.findAllAddresses();
  }

  @ApiOperation({ summary: 'Delete address by ID' })
  @ApiOkResponse({ status: 200, description: 'Successfully deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Delete(':addressId')
  async deleteAddress(@Param('addressId', ParseIntPipe) addressId: number) {
    await this.addressService.deleteAddress(addressId);
  }
}
