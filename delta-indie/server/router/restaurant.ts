import express from 'express';
import authenticate from '../middleware/authenticate';
import {
  addToCart,
  getCart,
  getDishes,
  getRestaurants,
} from '../handler/restaurant';

const restaurantRoutes = express.Router();

restaurantRoutes.get('/getAll', authenticate, getRestaurants);
restaurantRoutes.get('/:restaurantId/getAllDishes', authenticate, getDishes);
restaurantRoutes.post('/:restaurantId/addItem', authenticate, addToCart);
restaurantRoutes.get('/:restaurantId/getCartItems', authenticate, getCart);

export default restaurantRoutes;
