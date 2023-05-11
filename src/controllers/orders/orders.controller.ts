import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderDTO, OrderIdDTO } from "./orders.dto";

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get('/all')
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get()
  async findById(@Query() orderId: OrderIdDTO){
    console.log(orderId)
    return await this.ordersService.findById(orderId)
  }

  @Post('/create')
  async create(@Body() order: OrderDTO){
    return await this.ordersService.create(order)
  }

  @Post('/update')
  async update(@Query() orderId: OrderIdDTO, @Body() order: OrderDTO){
    return await this.ordersService.update(orderId, order)
  }

  @Post('/delete')
  async delete(@Query() orderId: OrderIdDTO){
    return await this.ordersService.delete(orderId)
  }
}