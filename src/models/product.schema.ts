import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  price: { type: Number, default: 0 },
  createdAt: { 
    type: Date,
    default: Date.now
  }
});