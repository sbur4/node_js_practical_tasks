import {Request, Response} from 'express';

import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {
    createNewCart,
    deleteCartByUserId,
    findCarByUserId,
    updatedProductInCart,
    validateReceivedUpdatedCartItem
} from "../../core/service/cart.service";
import {CartItemsDto} from "../../core/dto/car.items.dto";
import {createCartItemsDto} from "../../core/converter/cart.dto.converter";
import {findProductById} from "../../core/service/product.service";
import {CartUpdateDto} from "../../core/dto/cart.update.dto";

class CartController {
    public async getCart(req: Request, res: Response): Promise<void> {
        const userId = req.header(USER_ID_HEADER);

        const cart = await findCarByUserId(userId!);

        if (!cart) {
            console.log(`User does not have an active cart for user id:${userId}`);

            const newCart = await createNewCart(userId!);
            console.log(`Cart was created by user id:${userId}`);

            const cartDto: CartItemsDto = await createCartItemsDto(newCart!);

            res.status(201).json({
                data: cartDto,
                error: null
            });
            return;
        } else {
            if (cart.isDeleted) {
                res.status(404).json({
                    data: null,
                    error: {
                        message: `Cart was disabled for the user id:${userId}`
                    }
                });
                console.warn(`Cart was disabled for the user id:${userId}`);
                return;
            }

            console.log(`Cart was found by user id:${userId}`);

            const cartDto: CartItemsDto = await createCartItemsDto(cart);

            res.status(200).json({
                data: cartDto,
                error: null
            });
        }
    }

    public async updateCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);

            const validatedItem: CartUpdateDto = await validateReceivedUpdatedCartItem(req.body);

            const cart = await findCarByUserId(userId!);

            if (!cart) {
                console.log(`User id:${userId} has no cart`);

                res.status(400).json({
                    data: null,
                    error: `User id:${userId} has no cart`
                });
                return;
            } else {
                if (cart.isDeleted) {
                    res.status(404).json({
                        data: null,
                        error: {
                            message: `Cart was disabled for the user id:${userId}`
                        }
                    });
                    console.warn(`Cart was disabled for the user id:${userId}`);
                    return;
                }

                const product = findProductById(validatedItem.productId);

                if (!product) {
                    res.status(400).json({
                        data: null,
                        error: {
                            message: `Product is not valid by id:${validatedItem.productId}`
                        }
                    });
                    console.warn(`Product is not valid by id:${validatedItem.productId}`);
                    return;
                }
            }

            if (!cart.products.exists((cartItem) => cartItem.product.id === validatedItem.productId)) {
                res.status(400).json({
                    data: null,
                    error: {
                        message: `Cart id${cart?.id} doesn't contains a product:${validatedItem.productId}`
                    }
                });
                console.warn(`Cart id${cart?.id} doesn't contains a product:${validatedItem.productId}`);
                return;
                // todo or add new product to cart
            }

            const updatedCart = await updatedProductInCart(cart!, validatedItem!);

            const cartDto: CartItemsDto = await createCartItemsDto(updatedCart);

            res.status(200).json({
                data: {cart: cartDto},
                error: null
            });

        } catch (error: any) {
            if (error?.name === 'CartItemValidationException') {
                res.status(400).json({
                    data: null,
                    error: error.message,
                })
                return;
            }
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    public async deleteCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);

            const cart = await findCarByUserId(userId!);

            if (!cart) {
                console.log(`User id:${userId} has no cart`);

                res.status(400).json({
                    data: null,
                    error: `User id:${userId} has no cart`
                });
                return;
            } else {
                if (cart.isDeleted) {
                    res.status(404).json({
                        data: null,
                        error: {
                            message: `Cart was disabled for the user id:${userId}`
                        }
                    });
                    console.warn(`Cart was disabled for the user id:${userId}`);
                    return;
                }

                console.log(`Cart was found by user id:${userId}`);

                await deleteCartByUserId(cart);

                res.status(200).send({
                    data: {
                        success: true,
                    },
                    error: null
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }
}

export default new CartController();