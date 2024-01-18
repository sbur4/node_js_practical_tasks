// import {CartEntity, CartItemEntity} from "../../data/entity/cart.entity";
// import {CartItemsDto} from "../dto/car.items.dto";
// import {Product} from "../dto/product.";
//
// export function createCartItemsDto(cart: CartEntity): CartItemsDto {
//     const items: Product[] = cart.items.map(cartItem => ({
//         product: cartItem.product,
//         count: cartItem.count,
//     }));
//
//     const total = calculateTotal(cart.items);
//
//     return {
//         id: cart.id,
//         items,
//         total,
//     };
// }
//
// export function calculateTotal(cartItems: CartItemEntity[]): number {
//     return cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.count, 0);
// }