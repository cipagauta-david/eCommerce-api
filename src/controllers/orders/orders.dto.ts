import { Product } from "src/types/product"
import { ProductDTO, ProductIdDTO } from "../products/products.dto"

export interface ProductOrder {
  product: Product,
  quantity: number
}
export interface OrderDTO {
  totalPrice: number,
  products: ProductOrder[]
}

export interface OrderIdDTO {
  id: string
}