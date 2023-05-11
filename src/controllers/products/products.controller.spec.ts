import { ProductsController } from './products.controller';
import { ProductIdDTO } from './products.dto';
import { ProductsService } from './products.service';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let model: Model<Product>

  beforeEach(() => {
    service = new ProductsService(model);
    controller = new ProductsController(service);
  });

  describe('findAll', () => {
    it('should return an array of Products', async () => {
      let result: Product[];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a Product', async () => {
      let result: Product;
      let productId: ProductIdDTO;
      jest.spyOn(service, 'findById').mockResolvedValue(result);
      expect(await controller.findById(productId)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a Product', async () => {
      let result: Product;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create({
        title: "string",
        description: "string",
        image: "string",
        price: 10,
      })).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a Product', async () => {
      let result: Product;
      let productId: ProductIdDTO;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(productId,{
        title: "string",
        description: "string",
        image: "string",
        price: 10,
      })).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return a Product', async () => {
      let result: Product;
      let productId: ProductIdDTO;
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await controller.delete(productId)).toBe(result);
    });
  });

});
