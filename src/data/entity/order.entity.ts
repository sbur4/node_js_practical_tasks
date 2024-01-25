import {model, Schema} from 'mongoose';

import {cartItemSchema, ICartEntity, TCartItems} from "./cart.entity";
import type {IUserEntity} from "./user.entity";

enum ORDER_STATUS {
    CREATED = 'created',
    COMPLETED = 'completed',
}

export interface IPayment {
    type: string,
    address?: any
    creditCard?: any
}

export const orderPayment = new Schema<IPayment>({
    type: Schema.Types.String,
    address: Schema.Types.Mixed,
    creditCard: Schema.Types.Mixed,
})

export interface IDelivery {
    type: string,
    address: any,
}

export const orderDelivery = new Schema<IDelivery>({
    type: {type: Schema.Types.Mixed},
    address: Schema.Types.Mixed
})

export interface IOrderEntity {
    id: string,
    user: IUserEntity,
    cart: ICartEntity,
    items: TCartItems,
    payment: IPayment,
    delivery: IDelivery,
    comments: string,
    status: ORDER_STATUS,
    total: number,
}

const orderSchema = new Schema<IOrderEntity>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
    items: [cartItemSchema],
    payment: {type:Schema.Types.Mixed, childSchemas:orderPayment},
    delivery: {type:Schema.Types.Mixed, childSchemas:orderDelivery},
    comments: {type: Schema.Types.String, default: ''},
    status: {type: Schema.Types.String, default: ORDER_STATUS.CREATED},
    total: {type: Schema.Types.Number, default: 0},
}, {
    versionKey: false,
});

orderSchema.methods.toJSON = function () {
    return {
        id: this._id,
        user: this.user,
        cart: this.cart,
        items: this.items,
        payment: this.payment,
        delivery: this.delivery,
        comments: this.comments,
        status: this.status,
        total: this.total
    }
};


export const OrderEntity = model('Order', orderSchema);