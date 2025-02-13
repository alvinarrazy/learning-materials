import { RequestHandler } from 'express';
import {
  addItemToCart,
  findCart,
  getDishesPaged,
  getRestaurantsPaged,
} from '../../service/restaurant';

export const getRestaurants: RequestHandler = async (req, res) => {
  try {
    const { page } = req.query;
    const data = await getRestaurantsPaged(+(page || 0));

    res.status(200).json({
      message: 'success',
      data,
    });
  } catch (err) {
    res.status((err as any)?.status || 500).json({ message: (err as any).msg });
  }
};

export const getDishes: RequestHandler = async (req, res) => {
  try {
    const { page } = req.query;
    const { restaurantId } = req.params;
    const data = await getDishesPaged(restaurantId as string, +(page || 0));

    res.status(200).json({
      message: 'success',
      data,
    });
  } catch (err) {
    res.status((err as any)?.status || 500).json({ message: (err as any).msg });
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  try {
    const { dishId, quantity, cartId } = req.body;
    const { user } = req;
    const { restaurantId } = req.params;

    const data = await addItemToCart(
      user.id,
      restaurantId,
      dishId,
      quantity,
      cartId,
    );
    res.status(200).json({
      message: 'success',
      data,
    });
  } catch (err) {
    res.status((err as any)?.status || 500).json({ message: (err as any).msg });
  }
};

export const getCart: RequestHandler = async (req, res) => {
  try {
    const { user } = req;
    const { restaurantId } = req.params;

    const data = await findCart(user.id, restaurantId);
    res.status(200).json({
      message: 'success',
      data,
    });
  } catch (err) {
    res.status((err as any)?.status || 500).json({ message: (err as any).msg });
  }
};
