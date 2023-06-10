import { ApiProperty } from "@nestjs/swagger"

export class ProductDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
  
  @ApiProperty()
  price: number;
}

export class ProductIdDTO {
  @ApiProperty()
  id: string;
}