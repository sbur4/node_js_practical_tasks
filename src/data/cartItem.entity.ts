// import { Entity, Property, ManyToOne, OneToOne } from '@mikro-orm/core';
//
// import { BaseEntity } from "./base.entity";
// import { ProductEntity } from "./product.entity";
// import { CartEntity } from "./cart.entity";
//
// @Entity()
// export class CartItemEntity extends BaseEntity {
//     @OneToOne(() => ProductEntity)
//     product!: ProductEntity;
//
//     @ManyToOne(() => CartEntity) // todo
//     cart!: CartEntity;
//
//     @Property()
//     count!: number;
// }