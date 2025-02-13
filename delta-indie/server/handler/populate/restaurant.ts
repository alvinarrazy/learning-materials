import { RequestHandler } from 'express';
import {
  generateDish,
  generateRestaurant,
} from '../../service/populate/restaurant';

export const populateRestaurant: RequestHandler = async (req, res) => {
  try {
    const restaurantIds = await generateRestaurant();
    await generateDish(restaurantIds);

    res.status(200).json({ message: 'success', restaurantIds });
  } catch (err) {
    res.status(500).json({ message: 'failed', error: err });
  }
};
