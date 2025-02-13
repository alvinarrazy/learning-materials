import { Dish, Restaurant } from '@/types/restaurant';
import api from './api';

export function getRestaurants() {
  return api.get<Restaurant[]>('rest/restaurants/getAll');
}

export function getDishes(restaurantId: string | number) {
  return api.get<Dish[]>(`rest/restaurants/${restaurantId}/getAllDish`);
}
