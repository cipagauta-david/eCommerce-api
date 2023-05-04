import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO, ProductIdDTO } from "./products.dto";

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  async findAll() {
    let all_products = await this.productsService.findAll();
    return all_products;
  }

  @Get('/:id')
  async findById(@Query() id: ProductIdDTO){
    return await this.productsService.findById(id)
  }

  @Post('/create')
  async create(@Body() product: ProductDTO){
    return await this.productsService.create(product)
  }

  @Post('/update')
  async update(@Query() id: ProductIdDTO, @Body() product: ProductDTO){
    return await this.productsService.update(id, product)
  }

  @Post('/delete')
  async delete(@Query() id: ProductIdDTO){
    return await this.productsService.delete(id)
  }
}