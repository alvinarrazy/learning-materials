import {
  createNewCart,
  getDishes,
  getRestaurants,
  getUserCart,
  setCart,
} from '../../repository/restaurant';

export function getRestaurantsPaged(page?: number) {
  if (!page) {
    throw { status: 400, msg: 'page params needed' };
  }

  return getRestaurants(page);
}

export function getDishesPaged(restaurantId?: string, page?: number) {
  if (!page || !restaurantId) {
    throw { status: 400, msg: 'page & restaurantId params needed' };
  }

  return getDishes(restaurantId, page);
}

export async function findCart(userId: string, restaurantId: string) {
  if (!userId || !restaurantId) {
    throw { status: 400, msg: 'params not completed' };
  }

  const cart = await getUserCart(userId, restaurantId);
  if (!cart) throw { status: 404, msg: 'cart not found' };

  return cart;
}

export async function addItemToCart(
  userId: string,
  restaurantId: string,
  itemId: string,
  quantity: number,
) {
  if (!userId || !restaurantId || !itemId) {
    throw { status: 400, msg: 'params not completed' };
  }

  const oldCart = await getUserCart(userId, restaurantId, itemId, true);
  if (oldCart.length) {
    await setCart(oldCart[0].id, quantity);
    return findCart(userId, restaurantId);
  }

  try {
    await createNewCart({
      user: userId,
      restaurant: restaurantId,
      dish: itemId,
      quantity,
    });
    return findCart(userId, restaurantId);
  } catch {
    throw { status: 400, msg: 'something is wrong' };
  }
}
