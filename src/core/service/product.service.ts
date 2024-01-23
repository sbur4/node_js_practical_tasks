import {DI} from "../../web/demo.app";
import {ProductEntity} from "../../data/entity/product.entity";

export async function findAllProducts() {
    return await DI.productRepository.findAll();
}

export async function findProductById(id: string): Promise<ProductEntity | null> {
    return await DI.productRepository.findOne({id: id});
}