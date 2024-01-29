import {IProductEntity, ProductEntity} from "../../data/entity/product.entity";
import ProductsNotFoundException from "../exception/products.not.found.exception";
import ProductNotFoundByIdException from "../exception/product.not.found.by.user.id.exception";

export async function findAllProducts() {
    try {
        return await ProductEntity.find();
    } catch (error) {
        console.error('Products not found', error);
        throw new ProductsNotFoundException();
    }
}

export async function findProductById(id: string): Promise<IProductEntity | null> {
    try {
        return await ProductEntity.findById(id);
    } catch (error) {
        console.error(`Product not found by id:${id} `, error);
        throw new ProductNotFoundByIdException(id);
    }
}