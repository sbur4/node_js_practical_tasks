import {ICartEntity} from "../../data/entity/cart.entity";
import {IProductEntity} from "../../data/entity/product.entity";

export interface UpdateCartDto {
    userId: string;
    product: IProductEntity;
    amount: number;
    currentCart: ICartEntity;
}

// todo +