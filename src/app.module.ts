import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './controllers/products/products.module';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersModule } from './controllers/orders/orders.module';
import { OrdersController } from './controllers/orders/orders.controller';

@Module({
  imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecommerce'),
        ProductsModule, OrdersModule
    ],
  controllers: [AppController, ProductsController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
