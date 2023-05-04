import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema } from "src/models/product.schema";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Product',
    schema: productSchema
  }])],
  
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}