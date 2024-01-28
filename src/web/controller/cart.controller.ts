import {Request, Response} from 'express';

import {createNewCart, deleteCartByUserId, findCarByUserId,} from "../../core/service/cart.service";
import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {CartEntity, ICartEntity} from "../../data/entity/cart.entity";
import {amountValidator, idValidator} from "../../core/validator/id.validator";
import {UpdateCartDto} from "../../core/dto/update.cart.dto";
import {AddProductToCartDto} from "../../core/dto/add.product.to.cart.dto";
import {findProductById} from "../../core/service/product.service";
import {IProductEntity} from "../../data/entity/product.entity";
import {CartItemsDto} from "../../core/dto/car.items.dto";
import {createCartItemsDto} from "../../core/converter/cart.dto.converter";

class CartController {
    public async getCart(req: Request, res: Response): Promise<void> {
        try {
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
        } catch (error: any) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    //

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

    //
    // public async addToCart(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.header(USER_ID_HEADER);
    //
    //         const productId = req.body.id;
    //
    //         if (idValidator(productId)) {
    //             res.status(400).json({
    //                 data: null,
    //                 error: `Invalid product id:${productId}!`
    //             });
    //             return;
    //         }
    //
    //         const product = await findProductById(productId);
    //         console.log(`Product was found by id:${productId}`);
    //
    //         if (!product) {
    //             console.log(`Product can't find by id:${productId}`);
    //             res.status(404).json({
    //                 data: null,
    //                 error: {
    //                     message: `No product with such id:${productId}`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         const currentCart: ICartEntity | null = await CartEntity.findOne({user: userId});
    //
    //         if (currentCart !== null && currentCart!.isDeleted) {
    //             console.log(`Cart was deleted by id:${currentCart!.id}`);
    //             res.status(400).json({
    //                 data: null,
    //                 error: {
    //                     message: `Cart was deleted by id:${currentCart!.id} for the user with id:${userId}`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         const cartDto: AddProductToCartDto = {
    //             userId: userId!,
    //             product: product!,
    //             currentCart: currentCart!
    //         }
    //
    //         const newCart = await addProductToCart(cartDto);
    //
    //         res.status(200).json({
    //             data: {cart: newCart},
    //             error: null
    //         });
    //
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json(SERVER_ERROR_RESPONSE);
    //     }
    // }

    // public async updateCart(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.header(USER_ID_HEADER);
    //
    //         const productId = req.body.id;
    //         const amount = req.body.count;
    //
    //         if (idValidator(productId)) {
    //             res.status(400).json({
    //                 data: null,
    //                 error: `Invalid product id:${productId}!`
    //             });
    //             return;
    //         }
    //
    //         if (amountValidator(amount)) {
    //             res.status(400).json({
    //                 data: null,
    //                 error: `Invalid amount of product id:${productId}. Must be a number!`
    //             });
    //             return;
    //         }
    //
    //         const currentCart: ICartEntity | null = await CartEntity.findOne({user: userId});
    //
    //         if (currentCart !== null && currentCart!.isDeleted) {
    //             console.log(`Cart was deleted by id:${currentCart!.id}`);
    //             res.status(404).json({
    //                 data: null,
    //                 error: {
    //                     message: `Cart was deleted by id:${currentCart!.id} for the user with id:${userId}`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         if (!currentCart) {
    //             console.log(`User id:${userId} haven't cart`);
    //             res.status(404).json({
    //                 data: null,
    //                 error: {
    //                     message: `User id:${userId} haven't cart`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         const product: IProductEntity | null = await findProductById(productId);
    //         console.log(`Product was found by id:${productId}`);
    //
    //         if (!product) {
    //             console.log(`Product can't find by id:${productId}`);
    //             res.status(400).json({
    //                 data: null,
    //                 error: {
    //                     message: `No product with such id:${productId}`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         const isCartContainsProduct = currentCart!.items.some(item => item.product.id === product.id); //todo
    //
    //         // if (!isCartContainsProduct) {
    //         //     console.log(`Cart:${currentCart!.id} isn't contains product id:${product!.id}`);
    //         //     res.status(400).json({
    //         //         data: null,
    //         //         error: {
    //         //             message: `Cart isn't contains product`
    //         //         }
    //         //     });
    //         //     return;
    //         // }
    //
    //         const cartDto: UpdateCartDto = {
    //             userId: userId!,
    //             product: product!,
    //             amount: amount!,
    //             currentCart: currentCart!
    //         }
    //
    //         const newCart = updateCart(cartDto);
    //         console.log(`Cart was updated by user id:${userId}`);
    //
    //         res.status(201).json({
    //             data: {cart: newCart},
    //             error: null
    //         });
    //
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json(SERVER_ERROR_RESPONSE);
    //     }
    // }
    //
    // public async deleteCart(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.header(USER_ID_HEADER);
    //
    //         const currentCart: ICartEntity | null = await CartEntity.findOne({user: userId});
    //
    //         if (currentCart !== null && currentCart!.isDeleted) {
    //             console.log(`Cart was deleted by id:${currentCart!.id}`);
    //             res.status(400).json({
    //                 data: null,
    //                 error: {
    //                     message: `Cart was deleted by id:${currentCart!.id} for the user with id:${userId}`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         if (currentCart === null) {
    //             console.log(`User:${userId} have not a cart`);
    //             res.status(400).json({
    //                 data: null,
    //                 error: {
    //                     message: `User:${userId} have not a cart`
    //                 }
    //             });
    //             return;
    //         }
    //
    //         await deleteCartByUser(currentCart!);
    //
    //         res.status(200).send({
    //             data: {
    //                 success: true,
    //             },
    //             error: null
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json(SERVER_ERROR_RESPONSE);
    //     }
    // }
}

export default new CartController();