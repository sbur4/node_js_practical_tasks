import {Collection} from '@mikro-orm/core';

import {CartItemsDto} from "../dto/car.items.dto";
import {CartEntity} from "../../data/entity/cart.entity";
import {CartItemEntity} from "../../data/entity/cartItem.entity";

export function createCartItemsDto(cart: CartEntity): CartItemsDto {
    const totalSum: number = calculateTotalSum(cart.products);

    return {
        cart: cart, total: totalSum!,
    };
}

export function calculateTotalSum(items: Collection<CartItemEntity>) {
    return items.reduce((sum, item) => sum + item.count * item.product.price, 0);
}