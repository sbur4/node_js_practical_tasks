import {Request, Response} from 'express';

import {
    addProductsToCart,
    createNewCart,
    deleteCart,
    getCart,
    validateReceivedUpdatedCartItem
} from "../../core/service/cart.service";
import {isUserContainCartAndProduct, isUserHasActiveCart} from "../../data/repository/cart.repository";
import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {CartUpdateEntity} from "../../data/entity/cart.entity";
import {findProductById} from "../../core/service/product.service";

class CartController {

    public getCart(req: Request, res: Response): void {
        try {
            const userId = req.header(USER_ID_HEADER);

            const userCart = getCart(userId!);

            console.log(`Cart was found by user id:${userId}`);
            res.status(200).json({
                data: {cart: userCart},
                error: null
            });

        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    public createCart(req: Request, res: Response): void {
        try {
            const userId = req.header(USER_ID_HEADER);

            const newCart = createNewCart(userId!);
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
        try {
            const userId = req.header(USER_ID_HEADER);

            const validatedItem: CartUpdateEntity = await validateReceivedUpdatedCartItem(req.body);

            const isActiveCart = isUserHasActiveCart(userId!);
            if (!isActiveCart) {
                res.status(404).json({
                    data: null,
                    error: {
                        message: 'Cart was not found'
                    }
                });
                console.warn(`Cart was not found by user id:${userId}`);
                return;
            }

            const product = findProductById(validatedItem.productId);
            if (!product) {
                res.status(400).json({
                    data: null,
                    error: {
                        message: 'Product is not valid'
                    }
                });
                console.warn(`Product is not valid by id:${validatedItem.productId}`);
                return;
            }

            const isCartContainsProduct = isUserContainCartAndProduct(userId!, validatedItem.productId);
            if (!isCartContainsProduct) {
                res.status(400).json({
                    data: null,
                    error: {
                        message: `Cart isn't contains product`
                    }
                });
                console.warn(`Cart isn't contains product:${validatedItem.productId}`);
                return;
            }

            const updatedCart = addProductsToCart(userId!, validatedItem!);

            res.status(200).json({
                data: {cart: updatedCart},
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

    public deleteCart(req: Request, res: Response): void {
        try {
            const userId = req.header(USER_ID_HEADER);

            const isActiveCart = isUserHasActiveCart(userId!);
            if (!isActiveCart) {
                res.status(404).json({
                    data: null,
                    error: {
                        message: 'Cart was not found'
                    }
                });
                console.warn(`Cart was not found by user id:${userId}`);
                return;
            }

            deleteCart(userId!);

            res.status(200).send({
                data: {
                    success: true,
                },
                error: null
            });
        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }
}

export default new CartController();