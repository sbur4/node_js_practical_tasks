class ProductFindAllException extends Error {
    constructor() {
        super(`Products not found`);
        this.name = "ProductFindAllException";
    }
}

export default ProductFindAllException;

// todo +