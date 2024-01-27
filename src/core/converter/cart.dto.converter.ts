import {CartEntity, CartItemEntity} from "../../data/entity/cart.entity";
import {CartItemsDto} from "../dto/car.items.dto";
import {Product} from "../dto/product.";

export async function createCartItemsDto(cart: CartEntity): Promise<CartItemsDto> {
    const items: Product[] = cart.items.map(cartItem => ({
        product: cartItem.product,
        count: cartItem.count,
    }));

    const total = await calculateTotal(cart.items);

    return {
        id: cart.id,
        items,
        total,
    };
}

export async function calculateTotal(cartItems: CartItemEntity[]): Promise<number> {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.count, 0);
}