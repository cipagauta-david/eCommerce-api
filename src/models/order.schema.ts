import * as mongoose from 'mongoose';
export const orderSchema = new mongoose.Schema({

  totalPrice: {
    type: Number,
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});