import {findAll, findById} from "../../data/repository/product.repository";
import ProductsNotFoundException from "../exception/products.not.found.exception";
import ProductNotFoundByIdException from "../exception/product.not.found.by.user.id.exception";
import {ProductEntity} from "../../data/entity/product.entity";

export async function findAllProducts(): Promise<ProductEntity[]> {
    try {
        return await findAll();
    } catch (error) {
        console.error(`Products not found `, error);
        throw new ProductsNotFoundException();
    }
}

export async function findProductById(id: string): Promise<ProductEntity | undefined> {
    try {
        return await findById(id);
    } catch (error) {
        console.error(`Product not found by id:${id} `, error);
        throw new ProductNotFoundByIdException(id);
    }
}