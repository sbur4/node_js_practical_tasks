import {Request, Response} from 'express';

import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {addCartByUserId, addProductsToCart, findCartById} from "../../core/service/cart.service";
import {cartItemSchema, CartUpdateDto} from "../../core/dto/cart.update.dto";
import {DI} from "../demo.app";

class CartController {
    public async getCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);
            const cartId = req.body.id;

            const cart = await findCartById(cartId!);
            console.log(`Cart was found by user id:${userId}`);

            res.status(200).json({
                data: cart,
                error: null
            });

        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    public async createCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);

            const newCart = await addCartByUserId(userId!);
            console.log(`Cart was created by user id:${userId}`);

            res.status(201).json({
                data: newCart,
                error: null
            });

        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    public async updateCart(req: Request, res: Response): Promise<void> {
        async function validateReceivedUpdatedCartItem(updatedCartItem: CartUpdateDto) {
            try {
                return await cartItemSchema.validateAsync(updatedCartItem);
            } catch (error) {
                const err = new Error('Validation error');
                err.name = 'ValidationError';
                throw err;
            }
        }

        try {
            const userId = req.header(USER_ID_HEADER);
            const cartId = req.body.id;

            const validatedItem: CartUpdateDto = await validateReceivedUpdatedCartItem(req.body);

            const updatedCart = await addProductsToCart(userId!, cartId!, validatedItem);

            res.status(201).json({
                data: updatedCart,
                error: null
            });

        } catch (error: any) {
            if (error?.name === 'ValidationError') {
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
            const cartId = req.body.id;

            const cart = DI.cartRepository.findOne({id: cartId!});

            if (!cart) {
                res.status(404).json({
                    data: null,
                    error: {
                        message: 'Cart was not found'
                    }
                });

                console.warn(`Cart was not found by user id:${userId}`);
                return;

            } else {
                await DI.cartRepository.createQueryBuilder().delete({id: cartId!});
                console.log(`Cart was deleted by user id:${userId}`)

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