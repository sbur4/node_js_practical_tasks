class OrderCreateException extends Error {
    constructor(userId: string) {
        super(`Can't create order by user:${userId}`);
        this.name = "OrderCreateException";
    }
}

export default OrderCreateException;

// todo +