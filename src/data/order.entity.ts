// import {Collection, Entity, EntityRepositoryType, ManyToOne, Property, Ref,} from '@mikro-orm/core';
//
// import {BaseEntity} from "./base.entity";
// import {UserEntity} from "./user.entity";
// import {CartEntity} from "./cart.entity";
// import {CartItemEntity} from "./cartItem.entity";
// import {OrderRepository} from "../../data/repository/order.repository"; // todo
//
// export enum OrderStatus {
//     CREATED = 'created',
//     COMPLETED = 'completed',
// }
//
// type OrderPayment = {
//     type: string;
//     address?: any;
//     creditCard?: any;
// }
// export type OrderDelivery = {
//     type: string;
//     address: any;
// }
//
// // @Entity({customRepository: () => OrderRepository})
// @Entity()
// export class OrderEntity extends BaseEntity {
//     @ManyToOne({entity: () => UserEntity, nullable: true, ref: true})
//     user!: Ref<UserEntity>;
//
//     @ManyToOne({entity: () => CartEntity, nullable: true, ref: true, cascade: []})
//     cart!: Ref<CartEntity>;
//
//     @ManyToOne(() => CartItemEntity, {cascade: []})
//     items = new Collection<CartItemEntity>(this);
//
//     @Property()
//     payment!: OrderPayment;
//
//     @Property()
//     delivery!: OrderDelivery;
//
//     @Property()
//     comments?: string;
//
//     @Property()
//     status!: OrderStatus;
//
//     @Property()
//     total!: number;
//
//     [EntityRepositoryType]?: OrderRepository;
//
//     constructor(
//         payment: OrderPayment,
//         delivery: OrderDelivery,
//         comments: string,
//         status: OrderStatus,
//         total: number
//     ) {
//         super()
//         this.payment = payment;
//         this.delivery = delivery;
//         this.comments = comments;
//         this.status = status;
//         this.total = total;
//     }
// }
//
// // import {CartItemEntity} from "./cart.entity";
// //
// // export type OrderStatus = 'created' | 'completed';
// //
// // export interface OrderEntity {
// //     id: string; // uuid
// //     userId: string;
// //     cartId: string;
// //     items: CartItemEntity[]; // products from CartEntity
// //     payment: {
// //         type: string;
// //         address?: any;
// //         creditCard?: any;
// //     }
// //     delivery: {
// //         type: string;
// //         address: any;
// //     }
// //     comments: string;
// //     status: OrderStatus;
// //     total: number;
// // };
//
// // const order: OrderEntity = {
// //     id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
// //     userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
// //     cartId: '',
// //     items: cart.items,
// //     payment: {
// //         type: 'paypal',
// //         address: undefined,
// //         creditCard: undefined
// //     },
// //     delivery: {
// //         type: 'post',
// //         address: undefined
// //     },
// //     comments: '',
// //     status: 'created',
// //     total: 2,
// // }