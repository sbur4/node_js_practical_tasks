import {Entity, EntityRepositoryType, Property} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {ProductRepository} from "../repository/product.repository";

@Entity()
export class ProductEntity extends BaseEntity {

    @Property({
        name: 'title', type: 'string', primary: false, unique: true, nullable: false
    })
    title!: string;

    @Property({
        name: 'description', type: 'string', primary: false, unique: false, nullable: false
    })
    description!: string;

    @Property({
        name: 'price', type: 'float', primary: false, unique: false, nullable: false
    })
    price!: number;

    [EntityRepositoryType]?: ProductRepository;

    constructor(title: string, description: string, price: number) {
        super();
        this.title = title;
        this.description = description;
        this.price = price;
    }
}