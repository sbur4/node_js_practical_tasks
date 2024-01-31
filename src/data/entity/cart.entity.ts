import { model, Schema } from 'mongoose'

import { IUserEntity } from './user.entity'
import { IProductEntity } from './product.entity'

export interface ICartItemEntity {
    product: IProductEntity
    count: number
}

export type TCartItems = ICartItemEntity[]

export const cartItemSchema = new Schema<ICartItemEntity>({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: Schema.Types.Number,
})

cartItemSchema.methods.toJSON = function () {
    return {
        id: this._id,
        product: this.product,
        count: this.count,
    }
}

export interface ICartEntity {
    id: string
    user: IUserEntity
    isDeleted: boolean
    items: TCartItems
}

const cartSchema = new Schema<ICartEntity>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        isDeleted: { type: Schema.Types.Boolean, default: false },
        items: [cartItemSchema],
    },
    {
        versionKey: false,
    }
)

cartSchema.methods.toJSON = function () {
    return {
        id: this._id,
        user: this.user,
        isDeleted: this.isDeleted,
        items: this.items,
    }
}

export const CartEntity = model('Cart', cartSchema)
