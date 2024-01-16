import {CartItemEntity} from "./cart.entity";

export type OrderStatus = 'created' | 'completed';

export interface OrderEntity {
    id: string; // uuid
    userId: string;
    cartId: string;
    items: CartItemEntity[]; // products from CartEntity
    payment: {
        type: string;
        address?: any;
        creditCard?: any;
    }
    delivery: {
        type: string;
        address: any;
    }
    comments: string;
    status: OrderStatus;
    total: number;
};

// const order: OrderEntity = {
//     id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
//     userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//     cartId: '',
//     items: cart.items,
//     payment: {
//         type: 'paypal',
//         address: undefined,
//         creditCard: undefined
//     },
//     delivery: {
//         type: 'post',
//         address: undefined
//     },
//     comments: '',
//     status: 'created',
//     total: 2,
// }