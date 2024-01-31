class OrderCreateException extends Error {
    constructor(userId: string) {
        super(`Can't create an order for user id:${userId}`)
        this.name = 'OrderCreateException'
    }
}

export default OrderCreateException
