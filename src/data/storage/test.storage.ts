import {UserEntity} from "../entity/user.entity";
import {USERS_DB} from "../repository/user.repository";
import {ProductEntity} from "../entity/product.entity";
import {PRODUCTS_DB} from "../repository/product.repository";
import {CartEntity, CartItemEntity} from "../entity/cart.entity";
import {CARTS_DB} from "../repository/cart.repository";

const USER_1: UserEntity = {id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'};
const USER_2: UserEntity = {id: '0830da93-1dca-45a0-a740-ec5c83ad3aa5'};
const USER_3: UserEntity = {id: '7731dce9-be16-4279-bfd5-c0b3ccfb7a14'};

export const PRODUCT_1: ProductEntity = {
    id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
    title: 'Book',
    description: 'Interesting book',
    price: 200
};
export const PRODUCT_2: ProductEntity = {
    id: 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a0',
    title: 'Pen',
    description: 'Cute pen',
    price: 20
};
const PRODUCT_3: ProductEntity = {
    id: '19e2c314-1d6c-4ea5-a3ec-d3e85aed3546',
    title: 'Laptop',
    description: 'New Laptop',
    price: 1.99
};
const PRODUCT_4: ProductEntity = {
    id: '10d740c6-63a0-4947-ab9e-0750f744146c',
    title: 'Movie',
    description: 'Drama',
    price: 35.78
};
const PRODUCT_5: ProductEntity = {
    id: '8acc13fa-7b8d-4426-80da-c1d4240ce4dc',
    title: 'Backpack',
    description: 'EPAM backpack',
    price: 5
};

export function fillDatabase() {
    createUsers();
    createProducts();
    createCart();
    createOrder();
}

function createUsers() {
    USERS_DB.push(USER_1, USER_2, USER_3);
}

function createProducts() {
    PRODUCTS_DB.push(PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4, PRODUCT_5);
}

function createCart() {
    const CART_ITEM_1: CartItemEntity = {
        product: PRODUCT_1,
        count: 2
    }

    const CART_ITEM_2: CartItemEntity = {
        product: PRODUCT_2,
        count: 3
    }

    const USER_CART: CartEntity = {
        id: '1434fec6-cd85-420d-95c0-eee2301a971d',
        userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
        isDeleted: false,
        items: [CART_ITEM_1, CART_ITEM_2],
    }

    CARTS_DB.push(USER_CART)
}

function createOrder() {
    USERS_DB.push(USER_1, USER_2, USER_3);
}