import {
  CartItem,
  Dish,
  GetPaginationResponse,
  Restaurant,
} from '@/types/restaurant';
import api from './api';

export function getRestaurants(page = 1) {
  return api.get<GetPaginationResponse<Restaurant>>(
    `rest/restaurants/getAll?page=${page}`,
  );
}

export function getDishes(restaurantId: string, page = 1) {
  return api.get<GetPaginationResponse<Dish>>(
    `rest/restaurants/${restaurantId}/getAllDishes?page=${page}`,
  );
}

export function getCartItems(restaurantId: string) {
  return api.get<CartItem[]>(`rest/restaurants/${restaurantId}/getCartItems`);
}

export function setCartItem(
  restaurantId: string,
  dishId: string,
  quantity: number,
) {
  return api.post<CartItem[]>(`rest/restaurants/${restaurantId}/addItem`, {
    dishId,
    quantity,
  });
}
