import express from 'express';
import {EntityManager, MikroORM, RequestContext} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import http from "http";

import config from "./config/mikro.orm.config";
import {UserEntity} from "../data/entity/user.entity";
import {ProductEntity} from "../data/entity/product.entity";
import {CartEntity} from "../data/entity/cart.entity";
import {CartItemEntity} from "../data/entity/cartItem.entity";
import {OrderEntity} from "../data/entity/order.entity";
import productRouter, {PRODUCT_URL} from "../web/route/product.routes";
import cartRouter, {CART_URL} from "./route/cart.routes";
import {authenticationCheck} from "./middleware/auth.service";
import {UserRepository} from "../data/repository/user.repository";
import {ProductRepository} from "../data/repository/product.repository";
import {CartRepository} from "../data/repository/cart.repository";
import {CartItemRepository} from "../data/repository/cart.item.repository";
import {OrderRepository} from "../data/repository/order.repository";
import {fillDatabase} from "../data/storage/test.storage";
import {PaymentRepository} from "../data/repository/payment.repository";
import {PaymentEntity} from "../data/entity/payment.entity";
import {AddressEntity} from "../data/entity/adress.entity";
import {DeliveryEntity} from "../data/entity/delivery.entity";
import {AddressRepository} from "../data/repository/address.repository";
import {DeliveryRepository} from "../data/repository/delivery.repository";

const app = express();
const port = process.env.PORT ?? 3000;

export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    userRepository: UserRepository;
    productRepository: ProductRepository;
    cartRepository: CartRepository;
    cartItemRepository: CartItemRepository;
    orderRepository: OrderRepository;
    paymentRepository: PaymentRepository;
    addressRepository: AddressRepository;
    deliveryRepository: DeliveryRepository;
}

export const init = (async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

    await DI.orm.schema.refreshDatabase();

    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(UserEntity);
    DI.productRepository = DI.orm.em.getRepository(ProductEntity);
    DI.cartRepository = DI.orm.em.getRepository(CartEntity);
    DI.cartItemRepository = DI.orm.em.getRepository(CartItemEntity);
    DI.orderRepository = DI.orm.em.getRepository(OrderEntity);
    DI.paymentRepository = DI.orm.em.getRepository(PaymentEntity);
    DI.addressRepository = DI.orm.em.getRepository(AddressEntity);
    DI.deliveryRepository = DI.orm.em.getRepository(DeliveryEntity);

    await fillDatabase(DI.em).then(() => console.log('Database was filled'));

    app.use(express.json());
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    app.get('/', (req, res) =>
        res.json({
            message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, $"{CART_URL}" endpoints!`,
        })
    );

    app.use(authenticationCheck)
        .use(PRODUCT_URL, productRouter)
        .use(CART_URL, cartRouter);

    app.use((req, res) => res.status(404).json({message: 'No route found'}));

    DI.server = app.listen(port, () => {
        console.log(`Server is started at http://localhost:${port}`)
    })

})();