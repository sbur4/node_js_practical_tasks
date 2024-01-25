import {Product} from "./product.";

export interface CartItemsDto {
    id: string;
    items: Product[];
    total: number;
}

// todo +