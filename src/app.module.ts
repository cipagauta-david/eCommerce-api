import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './controllers/products/products.module';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersModule } from './controllers/orders/orders.module';
import { OrdersController } from './controllers/orders/orders.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: 'ecommerce'
    }),
    ProductsModule, OrdersModule
  ],
  controllers: [AppController, ProductsController, OrdersController],
  providers: [AppService],
})
export class AppModule { }
