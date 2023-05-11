import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from 'src/types/order';
import { OrderIdDTO, ProductOrder } from './orders.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;
  let model: Model<Order>

  beforeEach(() => {
    service = new OrdersService(model);
    controller = new OrdersController(service);
  });

  describe('findAll', () => {
    it('should return an array of Orders', async () => {
      let result: Order[];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a Order', async () => {
      let result: Order;
      let orderId: OrderIdDTO = {id:"64546654105e0a0a3561b1de"};

      jest.spyOn(service, 'findById').mockResolvedValue(result);
      // expect(await controller.findById(orderId)).toBe(result);
      console.log(await controller.findById(orderId))
    });
  });

  describe('create', () => {
    it('should return a Order', async () => {
      let result: Order;
      let products: ProductOrder[];
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create({
        totalPrice: 0,
        products: products
      })).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a Order', async () => {
      let result: Order;
      let orderId: OrderIdDTO;
      let products: ProductOrder[];
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(orderId, {
        totalPrice: 0,
        products: products
      })).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return a Order', async () => {
      let result: Order;
      let orderId: OrderIdDTO;
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await controller.delete(orderId)).toBe(result);
    });
  });
});
