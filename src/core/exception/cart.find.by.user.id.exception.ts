class CartFindByUserIdException extends Error {
    constructor(userId: string,cartId: string) {
        super(`Cart:${cartId} not found by user:${userId}`);
        this.name = "CartFindByUserIdException";
    }
}

export default CartFindByUserIdException;

// todo +