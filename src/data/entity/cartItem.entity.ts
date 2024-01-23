import {Cascade, Entity, EntityRepositoryType, ManyToOne, OneToOne, Property} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {ProductEntity} from "./product.entity";
import {CartEntity} from "./cart.entity";
import {CartItemRepository} from "../repository/cart.item.repository";

@Entity()
export class CartItemEntity extends BaseEntity {
    @Property({
        name: 'count', type: 'int', primary: false, unique: false, nullable: false
    })
    count!: number;

    @OneToOne(() => ProductEntity, {eager: true, cascade: [Cascade.ALL]})
    product!: ProductEntity;

    @ManyToOne(() => CartEntity, {eager: true, cascade: [Cascade.ALL]})
    cart!: CartEntity;

    [EntityRepositoryType] ?: CartItemRepository;
}