import {Product} from "./product.";

export interface CartItemsDto {
    items: Product[];
    total: number;
}