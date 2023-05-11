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

  async findById(orderId: OrderIdDTO): Promise<Order> {
    try {
      return await this.orderModel.findById(orderId.id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(order: OrderDTO): Promise<Order> {
    let new_order = {
      totalPrice: order.totalPrice,
      products: []
    }
    order.products.map(product => new_order.products.push(
      {
        product: product[0],
        quantity: product[1]
      }))
    return await (new this.orderModel(new_order)).save()
  }

  async update(orderId: OrderIdDTO, new_order: OrderDTO): Promise<Order> {
    let old_order = await this.findById(orderId)

    new_order.totalPrice ? old_order['totalPrice'] = new_order.totalPrice : null

    // this is slower
    // new_order.products ? old_order['products'] = new_order.products : null

    // this is faster
    let len = new_order.products.length
    if (new_order.products.length < old_order.products.length) {
      old_order.products = old_order.products.slice(0, len - old_order.products.length)
    } else if (new_order.products.length > old_order.products.length) {
      len = old_order.products.length
      old_order.products = old_order.products.concat(new_order.products.slice(len))
    }

    for (let i = 0; i < len; i++) {
      if (new_order.products[i].product != old_order.products[i].product) {
        old_order.products[i].product = new_order.products[i].product
      }
      if (new_order.products[i].quantity != old_order.products[i].quantity) {
        old_order.products[i].quantity = new_order.products[i].quantity
      }
    }

    try {
      return await this.orderModel.findByIdAndUpdate(orderId.id, old_order, {
        new: true
      }).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(orderId: OrderIdDTO): Promise<Order> {
    try {
      return await this.orderModel.findByIdAndRemove(orderId.id).exec()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}