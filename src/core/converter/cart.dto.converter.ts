import {ICartEntity} from "../../data/entity/cart.entity";
import {CartItemsDto} from "../dto/car.items.dto";
import {Product} from "../dto/product.";

export function createCartItemsDto(cart: ICartEntity): CartItemsDto {
    const products: Product[] = cart.items.map(cartItem => ({
        product: cartItem.product,
        count: cartItem.count,
    }));

    const total = calculateTotal(products);

    return {
        id: cart.id,
        items: products,
        total,
    };
}

export function calculateTotal(cartItems: Product[]): number {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.count, 0);
}

// todo +