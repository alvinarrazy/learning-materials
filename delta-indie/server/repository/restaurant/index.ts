import Restaurant, { IRestaurant } from '../../model/restaurant';
import Dish, { IDish } from '../../model/dish';
import { getPaginatedItems } from '../../utils/pagination';
import Cart from '../../model/cart';
import { Document } from 'mongoose';

export async function createNewRestaurant(params: IRestaurant) {
  const newData = new Restaurant(params);
  await newData.save();
  return newData;
}

export async function createNewDish(params: IDish) {
  const newData = new Dish(params);
  await newData.save();
  return newData;
}

export function getRestaurants(page: number) {
  return getPaginatedItems(Restaurant, { page });
}

export function getDishes(restaurant: string, page: number) {
  return getPaginatedItems(Dish, {
    page,
    filter: { restaurant },
  });
}

export async function getUserCart(
  user: string,
  restaurant: string,
  idOnly = false,
) {
  let query = Cart.find({ user, restaurant });

  if (idOnly) query = query.select('_id');

  const cart = await query;
  return cart;
}

export async function createNewCart(params: {
  user: string;
  restaurant: string;
  dish: string;
  quantity: number;
}) {
  const { user, restaurant, dish, quantity } = params;

  const newCart = new Cart({
    user,
    restaurant,
    dish,
    quantity,
  });
  const cart = await newCart.save();
  return cart;
}

export async function setCart(cart: string, quantity: number) {
  const existingCart = await Cart.findByIdAndUpdate(cart, { quantity });

  return existingCart;
}
