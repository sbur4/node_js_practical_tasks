import {CartEntity} from "../../data/entity/cart.entity";

export interface CartItemsDto {
    cart: CartEntity;
    total: number;
}