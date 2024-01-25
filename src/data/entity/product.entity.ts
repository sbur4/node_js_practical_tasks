import {model, Schema} from 'mongoose';

export interface IProductEntity {
    id: string;
    title: string;
    description: string;
    price: number;
}

const productSchema = new Schema<IProductEntity>({
    title: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: true},
    price: {type: Schema.Types.Number, required: true}
}, {
    versionKey: false,
});

productSchema.methods.toJSON = function () {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        price: this.price
    }
}

export const ProductEntity = model('Product', productSchema);

// todo +