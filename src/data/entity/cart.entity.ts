import Joi from 'joi';

import {ProductEntity} from "./product.entity";

export interface CartEntity {
    id: string; // uuid
    userId: string;
    isDeleted: boolean;
    items: CartItemEntity[];
}

export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}

export interface CartUpdateEntity {
    productId: string;
    count: number;
}

export const cartItemSchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required()
})

// const cartItem: CartItemEntity = {
//     product: bookProduct,
//     count: 2,
// }
//
// export const cart: CartEntity = {
//     id: '1434fec6-cd85-420d-95c0-eee2301a971d',
//     userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//     isDeleted: false,
//     items: [cartItem],
// }