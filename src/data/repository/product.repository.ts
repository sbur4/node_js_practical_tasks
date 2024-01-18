import {EntityRepository} from '@mikro-orm/core';

import {ProductEntity} from "../../data/entity/product.entity";
import {DI} from "../../web/demo.app";

export class ProductRepository extends EntityRepository<ProductEntity> {
    public async findAllProducts() {
        return await DI.productRepository.findAll();
    }

    public async findProductById(id: string) {
        return await DI.productRepository.findOne({id});
    }
}

// import {ProductEntity} from "../entity/product.entity";
//
// const PRODUCTS_DB: ProductEntity[] = [];
//
// export function findAll(): ProductEntity[] {
//     return structuredClone(PRODUCTS_DB);
// }
//
// export function findById(id: string): ProductEntity | undefined {
//     return PRODUCTS_DB.find((product) => product.id === id);
// }
//
// // for the tests
// export const PRODUCT_1: ProductEntity = {
//     id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
//     title: 'Book',
//     description: 'Interesting book',
//     price: 200
// };
// export const PRODUCT_2: ProductEntity = {
//     id: 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a0',
//     title: 'Pen',
//     description: 'Cute pen',
//     price: 20
// };
// const PRODUCT_3: ProductEntity = {
//     id: '19e2c314-1d6c-4ea5-a3ec-d3e85aed3546',
//     title: 'Laptop',
//     description: 'New Laptop',
//     price: 1.99
// };
// const PRODUCT_4: ProductEntity = {
//     id: '10d740c6-63a0-4947-ab9e-0750f744146c',
//     title: 'Movie',
//     description: 'Drama',
//     price: 35.78
// };
// const PRODUCT_5: ProductEntity = {
//     id: '8acc13fa-7b8d-4426-80da-c1d4240ce4dc',
//     title: 'Backpack',
//     description: 'EPAM backpack',
//     price: 5
// };
//
// PRODUCTS_DB.push(PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4, PRODUCT_5);