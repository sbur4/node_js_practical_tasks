import {DI} from "../../web/demo.app";

export function findAllProducts() {
    return DI.productRepository.findAll();
}

export function findProductById(id: string) {
    return DI.productRepository.findProductById(id);
}