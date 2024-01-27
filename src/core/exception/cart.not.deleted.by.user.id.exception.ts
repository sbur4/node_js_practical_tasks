class CartNotDeleteByUserId extends Error {
    constructor(userId: string) {
        super(`Can't delete cart by user id:${userId}`);
        this.name = "CartNotDeleteByUserId";
    }
}

export default CartNotDeleteByUserId;