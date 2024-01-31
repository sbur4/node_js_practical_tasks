class CartNotUpdatedByUserIdException extends Error {
    constructor(userId: string, cartId: string) {
        super(`Can't update cart id:${cartId} by id:${userId}`)
        this.name = 'CartNotUpdatedByUserIdException'
    }
}

export default CartNotUpdatedByUserIdException
