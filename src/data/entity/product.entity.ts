import {Entity, EntityRepositoryType, Property} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {ProductRepository} from "../repository/product.repository"; // todo

// @Entity({customRepository: () => ProductRepository})
@Entity()
export class ProductEntity extends BaseEntity {
    @Property()
    title!: string;

    @Property()
    description!: string;

    @Property()
    price!: number;

    [EntityRepositoryType]?: ProductRepository;

    constructor(title: string, description: string, price: number) {
        super();
        this.title = title;
        this.description = description;
        this.price = price;
    }
}

// export interface ProductEntity {
//     id: string; // uuid
//     title: string;
//     description: string;
//     price: number;
// };

// export const product: ProductEntity = {
//     id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
//     title: 'Book',
//     description: 'A very interesting book',
//     price: 100
// }