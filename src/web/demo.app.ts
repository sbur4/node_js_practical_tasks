import express from 'express';

import productRouter, {PRODUCT_URL} from "./route/product.routes";
import {authenticationCheck} from "./middleware/auth.service";
import cartRouter, {CART_URL} from './route/cart.routes'
import {fillDatabase} from "../data/storage/test.storage";

const app = express().use(express.json());

fillDatabase();

app.use(authenticationCheck)
    .use(PRODUCT_URL, productRouter)
    .use(CART_URL, cartRouter);

app.listen(3000, () => {
    console.log('Server is started');
})