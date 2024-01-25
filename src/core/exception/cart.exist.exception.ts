class CartNotExistException extends Error {
    constructor(userId: string) {
        super(`Cart is not exist for user:${userId}`);
        this.name = "CartNotExistException";
    }
}

export default CartNotExistException;

// todo +