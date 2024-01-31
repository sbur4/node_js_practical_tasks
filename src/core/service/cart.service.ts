import {
    CartEntity,
    ICartEntity,
    ICartItemEntity,
} from '../../data/entity/cart.entity'
import CartNotCreatedByIdException from '../exception/cart.not.created.by.user.id.exception'
import CartNotFoundByIdException from '../exception/cart.not.found.by.user.id.exception'
import { UserEntity } from '../../data/entity/user.entity'
import CartNotDeleteByUserId from '../exception/cart.not.deleted.by.user.id.exception'
import ProductNotAddedToCartException from '../exception/product.not.added.to.cart.exception'
import { IProductEntity } from '../../data/entity/product.entity'
import { cartItemSchema, CartUpdateDto } from '../dto/cart.update.dto'
import CartItemValidationException from '../exception/cart.item.validation.exception'
import CartNotUpdatedByUserIdException from '../exception/cart.not.updated.by.user.id.exception'

export async function findCarByUserId(
    userId: string
): Promise<ICartEntity | null> {
    try {
        return await CartEntity.findOne({ user: userId }).populate(
            'items.product'
        )
        // return await CartEntity.findOne({user: userId}).populate('items.product').populate('user.user') ;
        // return await CartEntity.findOne({user: userId});
    } catch (error) {
        console.error(`Cart not found by id:${userId} `, error)
        throw new CartNotFoundByIdException(userId)
    }
}

export async function createNewCart(
    userId: string
): Promise<ICartEntity | null> {
    try {
        const user = await UserEntity.findById(userId)

        const newCart = new CartEntity({
            user: user,
            items: [],
        })
        console.log(`Cart was created for user with id:${userId}`)

        await newCart.save()
        console.log(`Cart was saved by id:${newCart.id}`)

        return newCart
    } catch (error) {
        console.error(`Cart not created by id:${userId} `, error)
        throw new CartNotCreatedByIdException(userId)
    }
}

export async function updatedProductInCart(
    cart: ICartEntity,
    cartUpdateDto: CartUpdateDto
): Promise<ICartEntity | null> {
    try {
        let index

        if (cart.items.length !== 0) {
            if (cartUpdateDto.count === 0) {
                for (let cartItem of cart.items) {
                    if (cartItem.product.id === cartUpdateDto.productId) {
                        index = cart.items.indexOf(cartItem)
                    }
                }

                cart.items = cart.items.slice(index, 1)

                console.log(
                    `Product id:${cartUpdateDto.productId} was deleted from cart id:${cart.id}`
                )

                await CartEntity.updateOne(cart)
                console.log(
                    `Cart id:${cart.id} was updated by user id:${cart.user.id}`
                )

                return cart
            } else if (cartUpdateDto.count < 0) {
                for (let cartItem of cart.items) {
                    if (cartItem.product.id === cartUpdateDto.productId) {
                        index = cart.items.indexOf(cartItem)
                        const currentCount: number =
                            cartItem.count + cartUpdateDto.count

                        if (currentCount <= 0) {
                            cart.items = cart.items.slice(index, 1)
                            console.log(
                                `Product id:${cartUpdateDto.productId} was deleted from cart id:${cart.id}`
                            )
                        } else {
                            cartItem.count = currentCount
                            console.log(
                                `Product id:${cartUpdateDto.productId} was reduced in cart id:${cart.id}`
                            )
                        }
                    }
                }

                await CartEntity.updateOne(cart)
                console.log(
                    `Cart id:${cart.id} was updated by user id:${cart.user.id}`
                )

                return cart
            } else {
                for (let cartItem of cart.items) {
                    if (cartItem.product.id === cartUpdateDto.productId) {
                        cartItem.count += cartUpdateDto.count
                        console.log(
                            `Product id:${cartUpdateDto.productId} was increased in cart id:${cart.id}`
                        )
                    }
                }

                await CartEntity.updateOne(cart)
                console.log(
                    `Cart id:${cart.id} was updated by user id:${cart.user.id}`
                )

                return cart
            }
        } else {
            console.log(`Cart id:${cart.id} is empty`)
            return cart
        }
        // todo improve
    } catch (error) {
        console.error(
            `Can't update cart id:${cart.id} by id:${cart.user.id} `,
            error
        )
        throw new CartNotUpdatedByUserIdException(cart.user.id, cart.id)
    }
}

export async function insertProductIntoCart(
    product: IProductEntity,
    id: string
): Promise<ICartEntity> {
    try {
        let cart = await findCarByUserId(id)
        const user = await UserEntity.findById(id)

        if (!cart) {
            const newCart = new CartEntity({
                user,
                isDeleted: false,
                items: [],
            })

            const cartItem: ICartItemEntity = {
                product,
                count: 1,
            }

            newCart.items.push(cartItem)

            await newCart.save()

            return newCart
        } else {
            let cartItem

            for (let item of cart.items) {
                if (item.product.id === product.id) {
                    cartItem = item
                }
            }

            if (!cartItem) {
                const cartItem: ICartItemEntity = {
                    product,
                    count: 1,
                }

                cart.items.push(cartItem)

                await CartEntity.updateOne(cart)
            } else {
                for (let item of cart.items) {
                    if (item.product.id === cartItem.product.id) {
                        item.count = item.count + 1
                    }
                }

                await CartEntity.updateOne(cart)
            }
        }

        return cart
    } catch (error) {
        console.error(`Product id:${product.id} can't add to cart `, error)
        throw new ProductNotAddedToCartException(product.id)
    }
}

export async function deleteCartByUserId(cart: ICartEntity): Promise<void> {
    try {
        await CartEntity.deleteOne(cart)
        console.log(`Cart was deleted by user id:${cart.user.id}`)
    } catch (error) {
        console.error(`Can't delete cart by user id:${cart.user.id} `, error)
        throw new CartNotDeleteByUserId(cart.user.id)
    }
}

export async function validateReceivedUpdatedCartItem(
    updatedCartItem: CartUpdateDto
) {
    try {
        return await cartItemSchema.validateAsync(updatedCartItem)
    } catch (error) {
        console.error(
            `Invalid product id:${updatedCartItem.productId} or amount:${updatedCartItem.count} `,
            error
        )
        throw new CartItemValidationException(
            updatedCartItem.productId,
            updatedCartItem.count
        )
    }
}
