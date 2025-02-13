import { Types } from 'mongoose';
import { IDish } from '../../../model/dish';
import {
  createNewDish,
  createNewRestaurant,
} from '../../../repository/restaurant';
import { MockRestaurants, MockDish } from './constants';

export async function generateRestaurant() {
  const ids = [];

  for (const mock of MockRestaurants) {
    const data = await createNewRestaurant(mock);
    console.log('CREATED RESTAURANT', data.name, data.id);
    ids.push(data.id);
  }

  return ids;
}

export async function generateDish(restaurantIds: Types.ObjectId[]) {
  let dishRange = 0;
  const dishTotal = MockDish.length;
  for (const restaurantId of restaurantIds) {
    dishRange += 15;
    dishRange = dishRange % dishTotal;
    for (let i = dishRange - 15; i < dishRange; i++) {
      const dish = MockDish[i] as IDish;
      dish.restaurant = restaurantId;
      const data = await createNewDish(dish);
      console.log('CREATED DISH', data.name, data.id);
    }
  }
}
