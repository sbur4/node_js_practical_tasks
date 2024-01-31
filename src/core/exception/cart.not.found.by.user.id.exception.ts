class CartNotFoundByIdException extends Error {
    constructor(userId: string) {
        super(`Cart not found by id:${userId}`)
        this.name = 'CartNotFoundByIdException'
    }
}

export default CartNotFoundByIdException
