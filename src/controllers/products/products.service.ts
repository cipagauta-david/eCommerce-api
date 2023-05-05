import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/types/product';
import { ProductDTO, ProductIdDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findById(productId: ProductIdDTO): Promise<Product> {
    try {
      return this.productModel.findById(productId.id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(product: ProductDTO): Promise<Product> {
    return await (new this.productModel(product)).save()
  }

  async update(productId: ProductIdDTO, product: ProductDTO): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(productId.id, product, {
        new: true
      }).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(productId: ProductIdDTO): Promise<any> {
    try {
      return await this.productModel.findByIdAndRemove(productId.id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}