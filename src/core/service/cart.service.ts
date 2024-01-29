import {CartEntity, ICartEntity, ICartItemEntity} from "../../data/entity/cart.entity";
import CartNotCreatedByIdException from "../exception/cart.not.created.by.user.id.exception";
import CartNotFoundByIdException from "../exception/cart.not.found.by.user.id.exception";
import {UserEntity} from "../../data/entity/user.entity";
import CartNotDeleteByUserId from "../exception/cart.not.deleted.by.user.id.exception";
import ProductNotAddedToCartException from "../exception/product.not.added.to.cart.exception";
import {IProductEntity} from "../../data/entity/product.entity";
import {cartItemSchema, CartUpdateDto} from "../dto/cart.update.dto";
import CartItemValidationException from "../exception/cart.item.validation.exception";

export async function findCarByUserId(userId: string): Promise<ICartEntity | null> {
    try {
        return await CartEntity.findOne({user: userId});
    } catch (error) {
        console.error(`Cart not found by id:${userId} `, error);
        throw new CartNotFoundByIdException(userId);
    }
}

export async function createNewCart(userId: string): Promise<ICartEntity | null> {
    try {
        const user = await UserEntity.findById(userId);

        const newCart = new CartEntity({
            user: user,
            items: []
        });
        console.log(`Cart was created for user with id:${userId}`);

        await newCart.save();
        console.log(`Cart was saved by id:${newCart.id}`);

        return newCart;
    } catch (error) {
        console.error(`Cart not created by id:${userId} `, error);
        throw new CartNotCreatedByIdException(userId);
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
                    } else {
                        cartItem.count = currentCount;
                        console.log(`Product id:${cartUpdateDto.productId} was reduced in cart id:${cart.id}`);
                    }
                }
            }

            await DI.cartRepository.upsert(cart); // todo Why doesn't update?
            console.log(`Cart id:${cart.id} was updated by user id:${cart.user.id}`);

            return cart;
        } else {
            for (let cartItem of cart.products) {
                if (cartItem.product.id === cartUpdateDto.productId) {
                    cartItem.count += cartUpdateDto.count;
                    console.log(`Product id:${cartUpdateDto.productId} was increased in cart id:${cart.id}`);
                }
            }

            await DI.cartRepository.upsert(cart); // todo Why doesn't update?
            console.log(`Cart id:${cart.id} was updated by user id:${cart.user.id}`);

            return cart;
        }
    } catch (error) {
        console.error(`Can't update cart id:${cart.id} by id:${cart.user.id} `, error);
        throw new CartNotUpdatedByUserIdException(cart.user.id, cart.id);
    }
}

export async function insertProductIntoCart(product: IProductEntity, id: string): Promise<ICartEntity> {
    try {
        let cart = await findCarByUserId(id);
        const user = await UserEntity.findById(id);

        if (!cart) {
            const newCart = new CartEntity({
                user,
                isDeleted: false,
                items: []
            });

            const cartItem: ICartItemEntity = {
                product,
                count: 1
            };

            newCart.items.push(cartItem);

            await newCart.save();

            return newCart;
        } else {
            let cartItem;

            for (let item of cart.items) {
                if (item.product.id === product.id) {
                    cartItem = item;
                }
            }

            if (!cartItem) {
                const cartItem: ICartItemEntity = {
                    product,
                    count: 1
                };

                cart.items.push(cartItem);

                await CartEntity.updateOne(cart);  // todo Why doesn't update?
            } else {
                for (let item of cart.items) {
                    if (item.product.id === cartItem.product.id) {
                        item.count = item.count + 1;
                    }
                }

                await CartEntity.updateOne(cart);
                // // await CartEntity.findOneAndUpdate(cart);
                // await CartEntity.findByIdAndUpdate(cart);
                // await CartEntity.updateOne(cart, { $set: {count: 33}}).where(product.id);  // todo Why doesn't update?
            }
        }

        return cart;

    } catch (error) {
        console.error(`Product id:${product.id} can't add to cart `, error);
        throw new ProductNotAddedToCartException(product.id);
    }
}

export async function deleteCartByUserId(cart: ICartEntity): Promise<void> {
    try {
        await CartEntity.deleteOne(cart);
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

//-
// export async function getOrCreateCart(userId: string, cart: ICartEntity): Promise<CartItemsDto> {
//     try {
//         if (!cart) {
//             console.log(`User does not have an active cart, new cart was created for user id:${userId}`);
//
//             const newCart = new CartEntity({
//                 user: userId,
//                 items: []
//             });
//             console.log(`Cart was created for user with id:${userId}`);
//
//             await newCart.save();
//             console.log(`Cart was saved by user id:${userId}`);
//
//             const cartItemsDto: CartItemsDto = createCartItemsDto(newCart);
//             return cartItemsDto;
//         }
//
//         console.log(`Cart was found by user id:${userId}`);
//         const cartItemsDto: CartItemsDto = createCartItemsDto(cart);
//         return cartItemsDto;
//
//     } catch (error) {
//         console.error(`Cart:${cart.id} not found by user:${userId} `, error);
//         throw new CartFindByUserIdException(userId, cart.id);
//     }
// }
//
// export async function addProductToCart(cartDto: AddProductToCartDto): Promise<CartItemsDto> {
//     try {
//         if (!cartDto.currentCart) {
//             console.log(`User does not have an active cart, new cart was created for user id:${cartDto.userId}`);
//
//             const newCart = new CartEntity({
//                 user: cartDto.userId,
//                 items: [({
//                     product: cartDto.product,
//                     count: 1
//                 })]
//             });
//             console.log(`Cart was created for user with id:${cartDto.userId}`);
//
//             await newCart.save();
//             console.log(`Cart was saved by user id:${cartDto.userId}`);
//
//             const cartItemsDto: CartItemsDto = createCartItemsDto(newCart);
//             return cartItemsDto;
//         } else {
//             let cartItemToUpdate;
//
//             for (const item of cartDto.currentCart.items) { // TODO
//                 if (item.product.id === cartDto.product.id) {
//                     cartItemToUpdate = item;
//                     break;
//                 }
//             }
//
//             if (cartItemToUpdate) {
//                 cartItemToUpdate.count += 1;
//                 console.log(`Product:${cartDto.product.id} was updated in the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);
//             } else {
//                 cartDto.currentCart.items.push({
//                     product: cartDto.product,
//                     count: 1
//                 });
//                 console.log(`Product:${cartDto.product.id} was added to the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);
//             }
//
//             await CartEntity.updateOne({_id: cartDto.currentCart.id}, {$set: cartDto.currentCart});
//
//             const cartItemsDto: CartItemsDto = createCartItemsDto(cartDto.currentCart);
//             return cartItemsDto;
//         }
//     } catch (error) {
//         console.error(`Product:${cartDto.product.id} not added to the cart:${cartDto.currentCart.id} by user:${cartDto.userId} `, error);
//         throw new CartAddProductByIdException(cartDto.userId, cartDto.currentCart.id, cartDto.product.id);
//     }
// }
//
// export async function updateCart(cartDto: UpdateCartDto): Promise<CartItemsDto> {
//     try {
//
//         if (cartDto.amount === 0) {
//             const n: ICartItemEntity[] = [];
//
//             for (const item of cartDto.currentCart.items) { // TODO
//                 if (item.product.id != cartDto.product.id) {
//                     n.push(item);
//                 }
//             }
//
//             cartDto.currentCart.items = [];
//             cartDto.currentCart.items = n;
//         }
//
//         if (cartDto.amount > 0) {
//             for (const item of cartDto.currentCart.items) { // TODO
//                 if (item.product.id === cartDto.product.id) {
//                     item.count += cartDto.amount;
//                     break;
//                 }
//             }
//         }
//
//         if (cartDto.amount < 0) {
//             for (const item of cartDto.currentCart.items) { // TODO
//                 if (item.product.id === cartDto.product.id) {
//                     let a: number = item.count - cartDto.amount;
//                     if (a <= 0) {
//                         // del
//                     } else {
//                         // set new
//                     }
//                 }
//             }
//         }
//
//         await CartEntity.updateOne({_id: cartDto.currentCart.id}, {$set: cartDto.currentCart});
//         console.log(`Product:${cartDto.product.id} was updated in the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);
//
//         const cartItemsDto: CartItemsDto = createCartItemsDto(cartDto.currentCart);
//         return cartItemsDto;
//     } catch (error) {
//         console.error(`Cart:${cartDto.currentCart.id} not updated by user:${cartDto.userId} `, error);
//         throw new CartUpdateException(cartDto.userId, cartDto.currentCart.id);
//     }
// }
