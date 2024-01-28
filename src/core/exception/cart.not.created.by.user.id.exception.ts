class CartNotCreatedByIdException extends Error {
    constructor(userId: string) {
        super(`Cart not created by id:${userId}`);
        this.name = "CartNotCreatedByIdException";
    }
}

export default CartNotCreatedByIdException;