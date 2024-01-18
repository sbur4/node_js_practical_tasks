import {Request, Response} from 'express';

import {SERVER_ERROR_RESPONSE} from "../../core/util/response.util";
import {findAllProducts, findProductById} from "../../core/service/product.service";

class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products =findAllProducts();
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

    public async getProductById(req: Request, res: Response) {
        try {
            const productId = req.params.id;

            const product = findProductById(productId);
            console.log(`Products was found by product id:${productId}`);

            if (!product) {
                console.log(`Products can't find by product id:${productId}`);
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