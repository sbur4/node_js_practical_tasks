import {
    addNewCart,
    getCartByUserId,
    isUserHasActiveCart,
    removeCart,
    updateCart
} from "../../data/repository/cart.repository";
import {CartEntity, cartItemSchema, CartUpdateEntity} from "../../data/entity/cart.entity";
import {CartItemsDto} from "../dto/car.items.dto";
import {createCartItemsDto} from "../converter/cart.dto.converter";

export function getCart(userId: string): CartItemsDto {
    const cart = getCartByUserId(userId);

    if (!cart) {
        addCart(userId);
        const cart: CartEntity = getCartByUserId(userId);

        const cartItemsDto: CartItemsDto = createCartItemsDto(cart);

        console.log(`User does not have an active cart, new cart was created for user id:${userId}`);
        return cartItemsDto;
    }

    console.log(`Cart was found by user id:${userId}`);
    const cartItemsDto: CartItemsDto = createCartItemsDto(cart);

    return cartItemsDto;
}

function addCart(userId: string): void {
    const isActiveCart = isUserHasActiveCart(userId);

    if (isActiveCart) {
        console.warn(`User with id=${userId} already has a cart`);
        return;
    }

    console.log(`New cart was created for user id:${userId}`);
    addNewCart(userId);
}

export function createNewCart(userId: string): CartEntity | undefined {
    try {
        const currentCart = getCartByUserId(userId);

        if (currentCart) {
            return getCartByUserId(userId);
        } else {
            addNewCart(userId);
            return getCartByUserId(userId);
        }

    } catch (error) {
        console.error(error);
    }
}

export function addProductsToCart(userId: string, cartUpdateEntity: CartUpdateEntity) {
    try {
        const updatedCart: CartEntity = updateCart(userId, cartUpdateEntity.productId, cartUpdateEntity.count);
        console.log(`Cart was updated by user id:${userId}`)

        return createCartItemsDto(updatedCart);
    } catch (error) {
        console.error(error);
    }
}

export function deleteCart(userId: string): void {
    try {
        removeCart(userId);
        console.log(`Cart was deleted by user id:${userId}`)
    } catch (error) {
        console.error(error);
    }
}

export async function validateReceivedUpdatedCartItem(updatedCartItem: CartUpdateEntity) {
    try {
        return await cartItemSchema.validateAsync(updatedCartItem);
    } catch (error) {
        const err = new Error('Validation error');
        err.name = 'ValidationError';
        throw err;
    }
}