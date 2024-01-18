// import {Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property, Ref,} from '@mikro-orm/core';
// import Joi from 'joi';
//
// import {BaseEntity} from "./base.entity";
// import {UserEntity} from "./user.entity";
// import {CartItemEntity} from "./cartItem.entity";
// import {CartRepository} from "../../data/repository/cart.repository"; // todo
//
// // @Entity({customRepository: () => CartRepository})
// @Entity()
// export class CartEntity extends BaseEntity {
//     @ManyToOne(() => UserEntity, {nullable: true, ref: true})
//     user!: Ref<UserEntity>;
//
//     @Property()
//     isDeleted?: boolean = false;
//
//     @OneToMany(() => CartItemEntity, (item) => item.cart, {
//         eager: true,
//         orphanRemoval: true
//     })
//
//     items = new Collection<CartItemEntity>(this);
//
//     [EntityRepositoryType] ?: typeof CartRepository;
//
//     constructor(isDeleted?: boolean) {
//         super();
//         this.isDeleted = isDeleted;
//     }
// }
//
// export const cartItemSchema = Joi.object({
//     productId: Joi.string().required(),
//     count: Joi.number().required()
// })
//
// // import Joi from 'joi';
// //
// // import {ProductEntity} from "./product.entity";
// //
// // export interface CartEntity {
// //     id: string; // uuid
// //     userId: string;
// //     isDeleted: boolean;
// //     items: CartItemEntity[];
// // }
// //
//
// //
// // export interface CartUpdateEntity {
// //     productId: string;
// //     count: number;
// // }
// //
// // export const cartItemSchema = Joi.object({
// //     productId: Joi.string().required(),
// //     count: Joi.number().required()
// // })
//
// // const cartItem: CartItemEntity = {
// //     product: bookProduct,
// //     count: 2,
// // }
// //
// // export const cart: CartEntity = {
// //     id: '1434fec6-cd85-420d-95c0-eee2301a971d',
// //     userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
// //     isDeleted: false,
// //     items: [cartItem],
// // }