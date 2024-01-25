class CartDeleteByUserId extends Error {
    constructor(userId: string, cartId: string) {
        super(`Can't delete cart:${cartId} from user:${userId}`);
        this.name = "CartFindByUserIdException";
    }
}

export default CartDeleteByUserId;

// todo +