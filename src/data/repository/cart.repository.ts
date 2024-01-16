import {CartEntity, CartItemEntity} from "../entity/cart.entity";
import {getUniqueID} from "../../core/util/uuid.generator.utils";
import {PRODUCT_1, PRODUCT_2} from "./product.repository";

let CARTS_DB: CartEntity[] = [];

export function getCartByUserId(userId: string): CartEntity {
    return CARTS_DB.find((cart) => cart.userId === userId && !cart.isDeleted)!;
}

export function isUserHasActiveCart(userId: string): boolean {
    return CARTS_DB.some((cart) => cart.userId === userId && !cart.isDeleted);
}

export function addNewCart(userId: string): void {
    CARTS_DB.push({
        id: getUniqueID(),
        userId,
        items: [],
        isDeleted: false
    });
}

export function isUserContainCartAndProduct(userId: string, productId: string): boolean {
    return CARTS_DB.some((cart) => cart.userId === userId
        && isCartContainsProduct(cart, productId));
}

function isCartContainsProduct(cart: CartEntity, productId: string): boolean {
    return cart.items.some((item) => item.product.id === productId);
}

export function updateCart(userId: string, productId: string, count: number): CartEntity {
    CARTS_DB.map((cart) => {
        if (cart.userId === userId) {
            cart.items.map((item) => {
                if (item.product.id === productId) {
                    item.count = count;
                }
            });
        }
    });

    return getCartByUserId(userId);
}

export function removeCart(userId: string): void {
    CARTS_DB = CARTS_DB.map((cart) => {
        if (cart.userId === userId && !cart.isDeleted) {
            cart.isDeleted = true;
        }
        return cart;
    });
}

// for the test
const CART_ITEM_1: CartItemEntity = {
    product: PRODUCT_1,
    count: 2
}

const CART_ITEM_2: CartItemEntity = {
    product: PRODUCT_2,
    count: 3
}

export const USER_CART: CartEntity = {
    id: '1434fec6-cd85-420d-95c0-eee2301a971d',
    userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    isDeleted: false,
    items: [CART_ITEM_1, CART_ITEM_2],
}

CARTS_DB.push(USER_CART);