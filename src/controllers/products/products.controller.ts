import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO, ProductIdDTO } from "./products.dto";

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get('/all')
  async findAll() {
    let all_products = await this.productsService.findAll();
    return all_products;
  }

  @Get()
  async findById(@Query() productId: ProductIdDTO){
    return await this.productsService.findById(productId)
  }

  @Post('/create')
  async create(@Body() product: ProductDTO){
    return await this.productsService.create(product)
  }

  @Post('/update')
  async update(@Query() productId: ProductIdDTO, @Body() product: ProductDTO){
    return await this.productsService.update(productId, product)
  }

  @Post('/delete')
  async delete(@Query() productId: ProductIdDTO){
    return await this.productsService.delete(productId)
  }
}