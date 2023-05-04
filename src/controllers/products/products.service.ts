import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/types/product';
import { ProductDTO, ProductIdDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async create(product: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(product);
    await createdProduct.save();
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findById(id: ProductIdDTO): Promise<Product> {
    try {
      return this.productModel.findById(id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: ProductIdDTO, data: ProductDTO): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, data, {
        new: true
      }).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: ProductIdDTO): Promise<any> {
    try {
      return await this.productModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}