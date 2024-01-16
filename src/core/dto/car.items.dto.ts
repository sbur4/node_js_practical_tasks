import {Product} from "./product.";

export interface CartItemsDto {
    id: string; // uuid
    items: Product[];
    total: number;
}