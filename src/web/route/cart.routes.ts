import express from 'express';

import CartController from "../controller/cart.controller";

const cartRouter = express.Router();

cartRouter.get('/', CartController.getCart);
cartRouter.put('/', CartController.updateCart);
cartRouter.delete('/', CartController.deleteCart);
// cartRouter.post('/checkout', OrderController.makeOrder);

export const CART_URL = '/api/profile/cart';
export default cartRouter;