class CartAddProductByIdException extends Error {
    constructor(userId: string, cartId: string, productId: string) {
        super(`Product:${productId} not added to the cart:${cartId} by user:${userId}`);
        this.name = "CartFindByUserIdException";
    }
}

export default CartAddProductByIdException;

// todo +