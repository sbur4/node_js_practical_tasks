class ProductNotAddedToCartException extends Error {
    constructor(productId: string) {
        super(`Product id:${productId} can't add to cart`);
        this.name = "ProductNotAddedToCartException";
    }
}

export default ProductNotAddedToCartException;