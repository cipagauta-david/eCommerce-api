import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { orderSchema } from "src/models/order.schema";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Order',
    schema: orderSchema
  }])],
  
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}