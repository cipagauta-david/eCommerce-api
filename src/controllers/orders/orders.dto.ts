import { Product } from "src/types/product"
import { ApiProperty } from "@nestjs/swagger";

export class ProductOrder {
  @ApiProperty()
  product: Product;

  @ApiProperty()
  quantity: number;
}
export class OrderDTO {
  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  products: ProductOrder[];
}

export class OrderIdDTO {
  @ApiProperty()
  id: string;
}