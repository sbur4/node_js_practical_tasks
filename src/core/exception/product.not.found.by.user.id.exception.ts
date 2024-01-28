class ProductNotFoundByIdException extends Error {
    constructor(userId: string) {
        super(`Product not found by id:${userId}`);
        this.name = "ProductNotFoundByIdException";
    }
}

export default ProductNotFoundByIdException;