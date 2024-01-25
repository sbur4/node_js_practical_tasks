import express from 'express';
import {connect} from 'mongoose';

import {authenticationCheck} from "./middleware/auth.service";
import productRouter, {PRODUCT_URL} from "./route/product.routes";
import cartRouter, {CART_URL} from "./route/cart.routes";
import {fillDatabase} from "../data/storage/test.storage";

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connect(`mongodb://localhost:27017/admin`).then(() => console.log('Connected to MongoDB!'));

        // Uncomment the line below to fill the database only once
        // await fillDatabase();

        app.use(express.json());
        app.get('/', (req, res) =>
            res.json({
                message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
            })
        );

        app.use(authenticationCheck)
            .use(PRODUCT_URL, productRouter)
            .use(CART_URL, cartRouter);

        app.use((req, res) =>
            res.status(404).json({message: 'No route found'})
        );

        app.listen(port, () => {
            console.log(`Server is started at http://localhost:${port}`)
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

startServer().then(() => console.log('Init server...'));

// todo +