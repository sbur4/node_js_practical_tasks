import {Request, Response} from 'express';

import {findAllProducts, findProductById} from "../../core/service/product.service";
import {SERVER_ERROR_RESPONSE} from "../../core/util/response.util";
import {idValidator} from "../../core/validator/id.validator";

class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await findAllProducts();
            console.log('Products was found');

            res.status(200).json({
                data: products,
                error: null
            });

        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;

            if (idValidator(productId)) {
                res.status(400).json({
                    data: null,
                    error: `Invalid product id:${productId}!`
                });
                return;
            }

            const product = await findProductById(productId);
            console.log(`Product was found by id:${productId}`);

            if (!product) {
                console.log(`Product can't find by id:${productId}`);
                res.status(404).json({
                    data: null,
                    error: {
                        message: `No product with such id:${productId}`
                    }
                });
                return;
            }

            res.status(200).json({
                data: product,
                error: null
            });

        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }
}

export default new ProductController();

// todo +