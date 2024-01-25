class CartUpdateException extends Error {
    constructor(userId: string, cartId: string) {
        super(`Cart:${cartId} not updated by user:${userId}`);
        this.name = "CartUpdateException";
    }
}

export default CartUpdateException;

// todo +