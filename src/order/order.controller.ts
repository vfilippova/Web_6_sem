import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateEntityOrder } from './order.entities';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully created',
    type: CreateEntityOrder,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Update an order by id' })
  @ApiOkResponse({
    status: 200,
    description: 'Order updated successfully',
    type: CreateEntityOrder,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Incorrect request arguments',
  })
  @ApiNotFoundResponse({ description: 'Nonexistent order' })
  @Put(':orderId')
  async update(
    @Param('orderId') orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(+orderId, updateOrderDto);
  }

  @ApiOperation({ summary: 'Get order by id' })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully retrieved',
    type: CreateEntityOrder,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Nonexistent order' })
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return await this.orderService.getOrderById(parseInt(orderId, 10));
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiOkResponse({
    status: 200,
    description: 'All orders have been found',
    type: [CreateEntityOrder],
  })
  @ApiNotFoundResponse({ description: 'No orders in the system' })
  @Get()
  async findAll() {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({ summary: 'Delete order by id' })
  @ApiOkResponse({ status: 200, description: 'Successfully deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: string) {
    await this.orderService.deleteOrder(parseInt(orderId, 10));
  }
}
