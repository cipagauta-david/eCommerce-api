import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/types/order';
import { OrderDTO, OrderIdDTO } from './orders.dto';

@Injectable()
@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async findById(id: OrderIdDTO): Promise<Order> {
    try {
      return this.orderModel.findById(id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: OrderDTO): Promise<Order> {
    let new_order = {
      totalPrice: data.totalPrice,
      products: [
        {
          product: data.product,
          quantity: data.quantity
        }
      ]
    }
    const Order = new this.orderModel(new_order)
    return await Order.save()
    //return await (new this.orderModel(data)).save()
  }

  async update(id: OrderIdDTO, data: OrderDTO): Promise<Order> {
    let updated_order = {
      ...(data.totalPrice && {
        totalPrice: data.totalPrice
      }),
    }
    try {
      return this.orderModel.findOneAndUpdate(id, updated_order, {
        new: true
      }).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: OrderIdDTO): Promise<Order> {
    try {
      return this.orderModel.findByIdAndRemove(id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}