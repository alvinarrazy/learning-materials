import mongoose, { Types } from 'mongoose';

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;

export interface IDish {
  restaurant?: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image?: string;
}
