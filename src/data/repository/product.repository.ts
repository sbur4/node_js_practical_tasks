import {ProductEntity} from "../entity/product.entity";

export const PRODUCTS_DB: ProductEntity[] = [];

export async function findAll(): Promise<ProductEntity[]> {
    return structuredClone(PRODUCTS_DB);
}

export async function findById(id: string): Promise<ProductEntity | undefined> {
    return PRODUCTS_DB.find((product) => product.id === id);
}