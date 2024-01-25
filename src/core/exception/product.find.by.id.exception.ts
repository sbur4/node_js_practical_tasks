class ProductFindByIdException extends Error {
    constructor(productId: string) {
        super(`Product not found by id:${productId}`);
        this.name = "ProductFindByIdException";
    }
}

export default ProductFindByIdException;

// todo +