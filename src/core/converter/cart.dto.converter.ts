import {Collection} from '@mikro-orm/core';

import {CartItemsDto} from "../dto/car.items.dto";
import {CartEntity} from "../../data/entity/cart.entity";
import {CartItemEntity} from "../../data/entity/cartItem.entity";

export async function createCartItemsDto(cart: CartEntity): Promise<CartItemsDto> {
    const totalSum: number = await calculateTotalSum(cart.products);

    return {
        cart: cart, total: totalSum!,
    };
}

export async function calculateTotalSum(items: Collection<CartItemEntity>): Promise<number> {
    return items.reduce((sum, item) => sum + item.count * item.product.price, 0);
}