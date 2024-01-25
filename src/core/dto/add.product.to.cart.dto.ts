import {ICartEntity} from "../../data/entity/cart.entity";
import {IProductEntity} from "../../data/entity/product.entity";

export interface AddProductToCartDto {
    userId: string;
    product: IProductEntity;
    currentCart: ICartEntity;
}

// todo +