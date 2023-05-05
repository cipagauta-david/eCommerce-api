import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderDTO, OrderIdDTO } from "./orders.dto";

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get('/:id')
  async findById(@Query() id: OrderIdDTO){
    return await this.ordersService.findById(id)
  }

  @Post('/create')
  async create(@Body() data: OrderDTO){
    return await this.ordersService.create(data)
  }

  @Post('/update')
  async update(@Query() id: OrderIdDTO, @Body() data: OrderDTO){
    return await this.ordersService.update(id, data)
  }

  @Post('/delete')
  async delete(@Query() id: OrderIdDTO){
    return await this.ordersService.delete(id)
  }
}