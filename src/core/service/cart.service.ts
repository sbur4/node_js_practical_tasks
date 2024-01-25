import {CartEntity, ICartEntity, ICartItemEntity} from "../../data/entity/cart.entity";
import {CartItemsDto} from "../dto/car.items.dto";
import {createCartItemsDto} from "../converter/cart.dto.converter";
import CartFindByUserIdException from "../exception/cart.find.by.user.id.exception";
import {AddProductToCartDto} from "../dto/add.product.to.cart.dto";
import CartAddProductByIdException from "../exception/cart.add.poduct.by.id.exception";
import {UpdateCartDto} from "../dto/update.cart.dto";
import CartUpdateException from "../exception/cart.update.exception";
import CartDeleteByUserId from "../exception/cart.delete.by.user.id.exception";
import CartNotExistException from "../exception/cart.exist.exception";

export async function getOrCreateCart(userId: string, cart: ICartEntity): Promise<CartItemsDto> {
    try {
        if (!cart) {
            console.log(`User does not have an active cart, new cart was created for user id:${userId}`);

            const newCart = new CartEntity({
                user: userId,
                items: []
            });
            console.log(`Cart was created for user with id:${userId}`);

            await newCart.save();
            console.log(`Cart was saved by user id:${userId}`);

            const cartItemsDto: CartItemsDto = createCartItemsDto(newCart);
            return cartItemsDto;
        }

        console.log(`Cart was found by user id:${userId}`);
        const cartItemsDto: CartItemsDto = createCartItemsDto(cart);
        return cartItemsDto;

    } catch (error) {
        console.error(`Cart:${cart.id} not found by user:${userId} `, error);
        throw new CartFindByUserIdException(userId, cart.id);
    }
}

export async function addProductToCart(cartDto: AddProductToCartDto): Promise<CartItemsDto> {
    try {
        if (!cartDto.currentCart) {
            console.log(`User does not have an active cart, new cart was created for user id:${cartDto.userId}`);

            const newCart = new CartEntity({
                user: cartDto.userId,
                items: [({
                    product: cartDto.product,
                    count: 1
                })]
            });
            console.log(`Cart was created for user with id:${cartDto.userId}`);

            await newCart.save();
            console.log(`Cart was saved by user id:${cartDto.userId}`);

            const cartItemsDto: CartItemsDto = createCartItemsDto(newCart);
            return cartItemsDto;
        } else {
            let cartItemToUpdate;

            for (const item of cartDto.currentCart.items) { // TODO
                if (item.product.id === cartDto.product.id) {
                    cartItemToUpdate = item;
                    break;
                }
            }

            if (cartItemToUpdate) {
                cartItemToUpdate.count += 1;
                console.log(`Product:${cartDto.product.id} was updated in the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);
            } else {
                cartDto.currentCart.items.push({
                    product: cartDto.product,
                    count: 1
                });
                console.log(`Product:${cartDto.product.id} was added to the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);
            }

            await CartEntity.updateOne({_id: cartDto.currentCart.id}, {$set: cartDto.currentCart});

            const cartItemsDto: CartItemsDto = createCartItemsDto(cartDto.currentCart);
            return cartItemsDto;
        }
    } catch (error) {
        console.error(`Product:${cartDto.product.id} not added to the cart:${cartDto.currentCart.id} by user:${cartDto.userId} `, error);
        throw new CartAddProductByIdException(cartDto.userId, cartDto.currentCart.id, cartDto.product.id);
    }
}

export async function updateCart(cartDto: UpdateCartDto): Promise<CartItemsDto> {
    try {

        if (cartDto.amount === 0) {
            const n: ICartItemEntity[] = [];

            for (const item of cartDto.currentCart.items) { // TODO
                if (item.product.id != cartDto.product.id) {
                    n.push(item);
                }
            }

            cartDto.currentCart.items = [];
            cartDto.currentCart.items = n;
        }

        if (cartDto.amount > 0) {
            for (const item of cartDto.currentCart.items) { // TODO
                if (item.product.id === cartDto.product.id) {
                    item.count += cartDto.amount;
                    break;
                }
            }
        }

        if (cartDto.amount < 0) {
            for (const item of cartDto.currentCart.items) { // TODO
                if (item.product.id === cartDto.product.id) {
                    let a: number = item.count - cartDto.amount;
                    if (a <= 0) {
                        // del
                    } else {
                        // set new
                    }
                }
            }
        }

        await CartEntity.updateOne({_id: cartDto.currentCart.id}, {$set: cartDto.currentCart});
        console.log(`Product:${cartDto.product.id} was updated in the cart:${cartDto.currentCart.id} by user id:${cartDto.userId}`);

        const cartItemsDto: CartItemsDto = createCartItemsDto(cartDto.currentCart);
        return cartItemsDto;
    } catch (error) {
        console.error(`Cart:${cartDto.currentCart.id} not updated by user:${cartDto.userId} `, error);
        throw new CartUpdateException(cartDto.userId, cartDto.currentCart.id);
    }
}

export async function deleteCartByUser(cart: ICartEntity): Promise<void> {
    try {
        await CartEntity.deleteOne(cart);
        console.log(`Cart was deleted by user id:${cart.user.id}`)
    } catch (error) {
        console.error(`Can't delete cart:${cart.id} from user:${cart.user.id}`, error);
        throw new CartDeleteByUserId(cart.user.id, cart.id);
    }
}

export async function findCartByUserId(userId: string): Promise<ICartEntity | null> {
    try {
        return await CartEntity.findOne({user: userId});
    } catch (error) {
        console.error(`Cart is not exist for user:${userId} `, error);
        throw new CartNotExistException(userId);
    }
}