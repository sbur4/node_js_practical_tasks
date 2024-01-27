import {DI} from "../../web/demo.app";
import {ProductEntity} from "../../data/entity/product.entity";
import ProductsNotFoundException from "../exception/products.not.found.exception";
import ProductNotFoundByIdException from "../exception/product.not.found.by.user.id.exception";

export async function findAllProducts(): Promise<ProductEntity[]> {
    try {
        return await DI.productRepository.findAll();
    } catch (error) {
        console.error(`Products not found `, error);
        throw new ProductsNotFoundException();
    }
}

export async function findProductById(id: string): Promise<ProductEntity | null> {
    try {
        return await DI.productRepository.findOne({id: id});
    } catch (error) {
        console.error(`Product not found by id:${id} `, error);
        throw new ProductNotFoundByIdException(id);
    }
}