import express from 'express';
import {EntityManager, MikroORM, RequestContext} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';

import config from "./config/orm.config";
import {UserEntity} from "../data/entity/user.entity";
import {ProductEntity} from "../data/entity/product.entity";
// import {CartEntity} from "../data/entity/cart.entity";
// import {OrderEntity} from "../data/entity/order.entity";
import productRouter, {PRODUCT_URL} from "../web/route/product.routes";
// import cartRouter, {CART_URL} from "../web/route/cart.routes";
import {authenticationCheck} from "./middleware/auth.service";
import http from "http";
import {UserRepository} from "../data/repository/user.repository";
import {ProductRepository} from "../data/repository/product.repository";

const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;

export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    userRepository: UserRepository;
    productRepository: ProductRepository;
    // cartRepository: CartRepository;
    // orderRepository: OrderRepository;
}

export const init = (async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(UserEntity);
    DI.productRepository = DI.orm.em.getRepository(ProductEntity);
    // DI.cartRepository = DI.orm.em.getRepository(CartEntity);
    // DI.orderRepository = DI.orm.em.getRepository(OrderEntity);

    app.use(express.json());
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    app.get('/', (req, res) =>
        res.json({
            message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, $"{CART_URL}" endpoints!`,
        })
    );

    app.use(authenticationCheck)
        .use(PRODUCT_URL, productRouter)
    // .use(CART_URL, cartRouter);

    app.use((req, res) => res.status(404).json({message: 'No route found'}));

    DI.server = app.listen(port, () => {
        console.log(`Server is started at http://localhost:${port}`)
    })
})();

// export const userService = new UserService(DI.userRepository);
// export const productService = new ProductService(DI.productRepository);
// export const cartService = new CartService(DI.cartRepository);