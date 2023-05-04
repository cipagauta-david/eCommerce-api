import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './controllers/products/products.module';
import { ProductsController } from './controllers/products/products.controller';

@Module({
  imports: [
        MongooseModule.forRoot('mongodb://localhost/ecommerce'),
        ProductsModule,
    ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
