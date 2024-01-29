import {DI} from "../../web/demo.app";
import {CartEntity} from "../../data/entity/cart.entity";
import {cartItemSchema, CartUpdateDto} from "../dto/cart.update.dto";
import CartNotFoundByIdException from "../exception/cart.not.found.by.user.id.exception";
import CartNotCreatedByIdException from "../exception/cart.not.created.by.user.id.exception";
import CartNotDeleteByUserId from "../exception/cart.not.deleted.by.user.id.exception";
import CartItemValidationException from "../exception/cart.item.validation.exception";
import CartNotUpdatedByUserIdException from "../exception/cart.not.updated.by.user.id.exception";
import ProductNotAddedToCartException from "../exception/product.not.added.to.cart.exception";
import {ProductEntity} from "../../data/entity/product.entity";
import {CartItemEntity} from "../../data/entity/cartItem.entity";

export async function findCarByUserId(userId: string): Promise<CartEntity | null> {
    try {
        return await DI.cartRepository.createQueryBuilder()
            .where({user_id: userId})
            .getSingleResult();
    } catch (error) {
        console.error(`Cart not found by id:${userId} `, error);
        throw new CartNotFoundByIdException(userId);
    }
}

export async function createNewCart(id: string): Promise<CartEntity | null> {
    try {
        const user = await DI.userRepository.findOne({id});
        const newCart: CartEntity = new CartEntity(false);
        newCart.user = user!;

        await DI.cartRepository.insert(newCart);
        console.log(`Cart was saved by id:${newCart.id}`);

        return newCart;
    } catch (error) {
        console.error(`Cart not created by id:${id} `, error);
        throw new CartNotCreatedByIdException(id);
    }
}

export async function updatedProductInCart(cart: CartEntity, cartUpdateDto: CartUpdateDto): Promise<CartEntity> {
    try {
        if (cartUpdateDto.count === 0) {
            cart.products.remove(cart.products.find(item => item.product.id === cartUpdateDto.productId)!);
            console.log(`Product id:${cartUpdateDto.productId} was deleted from cart id:${cart.id}`);

            await DI.cartRepository.upsert(cart);
            console.log(`Cart id:${cart.id} was updated by user id:${cart.user.id}`);

            return cart;
        } else if (cartUpdateDto.count < 0) {
            for (let cartItem of cart.products) {
                if (cartItem.product.id === cartUpdateDto.productId) {

                    const currentCount: number = cartItem.count + (cartUpdateDto.count);

                    if (currentCount <= 0) {
                        cart.products.remove(cart.products.find(item => item.product.id === cartUpdateDto.productId)!);
                        console.log(`Product id:${cartUpdateDto.productId} was deleted from cart id:${cart.id}`);
                        break;
                    } else {
                        cartItem.count = currentCount;
                        console.log(`Product id:${cartUpdateDto.productId} was reduced in cart id:${cart.id}`);
                        break;
                    }
                }
            }

            await DI.em.persist(cart).flush();
            console.log(`Cart id:${cart.id} was updated by user id:${cart.user.id}`);

            return cart;
        } else {
            for (let cartItem of cart.products) {
                if (cartItem.product.id === cartUpdateDto.productId) {
                    cartItem.count += cartUpdateDto.count;
                    console.log(`Product id:${cartUpdateDto.productId} was increased in cart id:${cart.id}`);
                    break;
                }
            }

            await DI.em.persist(cart).flush();
            console.log(`Cart id:${cart.id} was updated by user id:${cart.user.id}`);

            return cart;
        }
    } catch (error) {
        console.error(`Can't update cart id:${cart.id} by id:${cart.user.id} `, error);
        throw new CartNotUpdatedByUserIdException(cart.user.id, cart.id);
    }
}

export async function insertProductIntoCart(product: ProductEntity, id: string): Promise<CartEntity> {
    try {
        let cart = await findCarByUserId(id);
        const user = await DI.userRepository.findOne({id});

        if (!cart) {
            const newCart: CartEntity = new CartEntity(false);
            newCart.user = user!;

            const cartItem: CartItemEntity = new CartItemEntity();
            cartItem.product = product;
            cartItem.cart = cart!;
            cartItem.count = 1;

            newCart.products.add(cartItem);

            await DI.cartRepository.upsert(newCart);

            return newCart;
        } else {
            const cartItem = cart.products.find((cartItem) => cartItem.product.id == product.id);

            if (!cartItem) {
                const cartItem: CartItemEntity = new CartItemEntity();
                cartItem.product = product;
                cartItem.cart = cart!;
                cartItem.count = 1;

                cart.products.add(cartItem);

                await DI.em.persist(cart).flush();
            } else {
                for (let item of cart.products) {
                    if (item.product.id === cartItem.product.id) {
                        item.count = item.count + 1;
                    }
                }

                await DI.em.persist(cart).flush();
            }
        }

        return cart;

    } catch (error) {
        console.error(`Product id:${product.id} can't add to cart `, error);
        throw new ProductNotAddedToCartException(product.id);
    }
}

export async function deleteCartByUserId(cart: CartEntity): Promise<void> {
    try {
        await DI.cartRepository.createQueryBuilder().delete({id: cart.id});
        console.log(`Cart was deleted by user id:${cart.user.id}`)
    } catch (error) {
        console.error(`Can't delete cart by user id:${cart.user.id} `, error);
        throw new CartNotDeleteByUserId(cart.user.id);
    }
}

export async function validateReceivedUpdatedCartItem(updatedCartItem: CartUpdateDto) {
    try {
        return await cartItemSchema.validateAsync(updatedCartItem);
    } catch (error) {
        console.error(`Invalid product id:${updatedCartItem.productId} or amount:${updatedCartItem.count} `, error);
        throw new CartItemValidationException(updatedCartItem.productId, updatedCartItem.count);
    }
}