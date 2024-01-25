import {IProductEntity, ProductEntity} from "../../data/entity/product.entity";
import ProductFindByIdException from "../exception/product.find.by.id.exception";
import ProductFindAllException from "../exception/product.find.all.exception";

export async function findAllProducts() {
    try {
        return await ProductEntity.find();
    } catch (error) {
        console.error('Products not found', error);
        throw new ProductFindAllException();
    }
}

export async function findProductById(id: string): Promise<IProductEntity | null> {
    try {
        return await ProductEntity.findById(id);
    } catch (error) {
        console.error(`Product not found by id:${id} `, error);
        throw new ProductFindByIdException(id);
    }
}

// todo +