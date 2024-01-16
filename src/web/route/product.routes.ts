import express from "express";

import ProductController from "../controller/product.controller";

const productRouter = express.Router();

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);

export const PRODUCT_URL = '/api/products';

export default productRouter;