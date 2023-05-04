import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  createdAt: { 
    type: Date,
    default: Date.now
  }
});