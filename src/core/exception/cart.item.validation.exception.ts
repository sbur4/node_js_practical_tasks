class CartItemValidationException extends Error {
    constructor(productId: string, count: number) {
        super(`Invalid product id:${productId} or amount:${count}`);
        this.name = "CartItemValidationException";
    }
}

export default CartItemValidationException;