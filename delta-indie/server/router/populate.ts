import express from 'express';
import { populateRestaurant } from '../handler/populate/restaurant';

const populateRoutes = express.Router();

populateRoutes.get('/restaurants', populateRestaurant);

export default populateRoutes;
