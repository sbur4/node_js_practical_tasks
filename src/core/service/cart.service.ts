import {addNewCart, deleteByUserId, findByUserId, insertUpdatedCart} from "../../data/repository/cart.repository";
import {CartEntity, cartItemSchema, CartUpdateEntity} from "../../data/entity/cart.entity";
import CartNotFoundByIdException from "../exception/cart.not.found.by.user.id.exception";
import CartNotCreatedByIdException from "../exception/cart.not.created.by.user.id.exception";
import CartItemValidationException from "../exception/cart.item.validation.exception";
import CartNotDeleteByUserId from "../exception/cart.not.deleted.by.user.id.exception";
import CartNotUpdatedByUserIdException from "../exception/cart.not.updated.by.user.id.exception";

export async function findCarByUserId(userId: string): Promise<CartEntity | undefined> {
    try {
        return await findByUserId(userId);
    } catch (error) {
        console.error(`Cart not found by id:${userId} `, error);
        throw new CartNotFoundByIdException(userId);
    }
}

export async function createNewCart(userId: string): Promise<CartEntity> {
    try {
        return await addNewCart(userId);
    } catch (error) {
        console.error(`Cart not created by id:${userId} `, error);
        throw new CartNotCreatedByIdException(userId);
    }
}

export async function updatedProductInCart(cart: CartEntity, cartUpdateEntity: CartUpdateEntity): Promise<CartEntity> {
    try {
        if (cartUpdateEntity.count === 0) {
            const index = cart.items.findIndex(obj => obj.product.id === cartUpdateEntity.productId);

            cart.items = cart.items.slice(index, 1);
            console.log(`Product id:${cartUpdateEntity.productId} was deleted from cart id:${cart.id}`);

            await insertUpdatedCart(cart);
            console.log(`Cart id:${cart.id} was updated by user id:${cart.userId}`);

            return cart;
        } else if (cartUpdateEntity.count < 0) {
            for (let cartItem of cart.items) {
                if (cartItem.product.id === cartUpdateEntity.productId) {

                    const currentCount: number = cartItem.count;

                    if (cartUpdateEntity.count + currentCount <= 0) {
                        const index = cart.items.findIndex(obj => obj.product.id === cartUpdateEntity.productId);

                        cart.items = cart.items.slice(index, 1);
                        console.log(`Product id:${cartUpdateEntity.productId} was deleted from cart id:${cart.id}`);

                    } else {
                        cartItem.count += cartUpdateEntity.count;
                        console.log(`Product id:${cartUpdateEntity.productId} was reduced in cart id:${cart.id}`);
                    }
                }
            }

            await insertUpdatedCart(cart);
            console.log(`Cart id:${cart.id} was updated by user id:${cart.userId}`);

            return cart;
        } else {
            for (let cartItem of cart.items) {
                if (cartItem.product.id === cartUpdateEntity.productId) {
                    cartItem.count += cartUpdateEntity.count;
                    console.log(`Product id:${cartUpdateEntity.productId} was increased in cart id:${cart.id}`);
                }
            }

            await insertUpdatedCart(cart);
            console.log(`Cart id:${cart.id} was updated by user id:${cart.userId}`);

            return cart;
        }
    } catch (error) {
        console.error(`Can't update cart id:${cart.id} by id:${cart.userId} `, error);
        throw new CartNotUpdatedByUserIdException(cart.userId, cart.id);
    }
}

export async function deleteCartByUserId(userId: string): Promise<void> {
    try {
        await deleteByUserId(userId);
        console.log(`Cart was deleted by user id:${userId}`)
    } catch (error) {
        console.error(`Can't delete cart by user id:${userId} `, error);
        throw new CartNotDeleteByUserId(userId);
    }
}

export async function validateReceivedUpdatedCartItem(updatedCartItem: CartUpdateEntity) {
    try {
        return await cartItemSchema.validateAsync(updatedCartItem);
    } catch (error) {
        console.error(`Invalid product id:${updatedCartItem.productId} or amount:${updatedCartItem.count} `, error);
        throw new CartItemValidationException(updatedCartItem.productId, updatedCartItem.count);
    }
}