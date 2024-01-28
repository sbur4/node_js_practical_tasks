import {
    addNewCart,
    CARTS_DB,
    deleteByUserId,
    findByUserId,
    insertUpdatedCart,
    save
} from "../../data/repository/cart.repository";
import {CartEntity, CartItemEntity, cartItemSchema, CartUpdateEntity} from "../../data/entity/cart.entity";
import CartNotFoundByIdException from "../exception/cart.not.found.by.user.id.exception";
import CartNotCreatedByIdException from "../exception/cart.not.created.by.user.id.exception";
import CartItemValidationException from "../exception/cart.item.validation.exception";
import CartNotDeleteByUserId from "../exception/cart.not.deleted.by.user.id.exception";
import CartNotUpdatedByUserIdException from "../exception/cart.not.updated.by.user.id.exception";
import {ProductEntity} from "../../data/entity/product.entity";
import ProductNotAddedToCartException from "../exception/product.not.added.to.cart.exception";
import {getUniqueID} from "../util/uuid.generator.utils";

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

export async function insertProductIntoCart(product: ProductEntity, userId: string): Promise<CartEntity> {
    try {
        let cart = await findCarByUserId(userId);

        if (!cart) {
            const cartItem: CartItemEntity = {
                product,
                count: 1
            };

            cart = {
                id: getUniqueID(),
                userId,
                items: [cartItem],
                isDeleted: false
            };

            await save(cart);

            return cart;
        } else {
            const cartItem = cart.items.find((cartItem) => cartItem.product.id === product.id);

            if (!cartItem) {
                const cartItem: CartItemEntity = {
                    product,
                    count: 1
                };

                cart.items.push(cartItem);

                await insertUpdatedCart(cart);
            } else {
                cartItem.count++;

                const existingCartIndex: number = cart.items.findIndex(cartItem => cartItem.product === product);
                cart.items[existingCartIndex] = cartItem;

                await insertUpdatedCart(cart);
            }
        }

        return cart;

    } catch (error) {
        console.error(`Product id:${product.id} can't add to cart `, error);
        throw new ProductNotAddedToCartException(product.id);
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