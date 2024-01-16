import {findAll, findById} from "../../data/repository/product.repository";

export function findAllProducts() {
    return findAll();
}

export function findProductById(id: string) {
    return findById(id);
}