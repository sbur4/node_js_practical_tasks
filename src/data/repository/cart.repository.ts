import {CartEntity} from "../entity/cart.entity";
import {getUniqueID} from "../../core/util/uuid.generator.utils";

export let CARTS_DB: CartEntity[] = [];

export async function findByUserId(userId: string): Promise<CartEntity> {
    return CARTS_DB.find((cart) => cart.userId === userId)!;
}

export async function addNewCart(userId: string): Promise<CartEntity> {
    const userCart = {
        id: getUniqueID(),
        userId,
        items: [],
        isDeleted: false
    };

    CARTS_DB.push(userCart);

    return userCart;
}

export async function insertUpdatedCart(newCart: CartEntity): Promise<void> {
    const existingCartIndex: number = CARTS_DB.findIndex(existCart => existCart.id === newCart.id);
    CARTS_DB[existingCartIndex] = newCart;
}

export async function deleteByUserId(userId: string): Promise<void> {
    CARTS_DB = CARTS_DB.map((cart) => {
        if (cart.userId === userId && !cart.isDeleted) {
            cart.isDeleted = true;
        }
        return cart;
    });
}

export async function save(newCart: CartEntity): Promise<void> {
    CARTS_DB.push(newCart);
}