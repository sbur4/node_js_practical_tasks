import { Request, Response } from 'express';
import { findAllProducts } from '../src/core/service/product.service';
import ProductController from "../src/web/controller/product.controller";

jest.mock('./src/core/service/product.service'); // Mock the product service

describe('getAllProducts', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return all products with a 200 status code', async () => {
        // Mock the implementation of findAllProducts
        (findAllProducts as jest.Mock).mockResolvedValue(['product1', 'product2']);

        await new ProductController.getAllProducts(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            data: ['product1', 'product2'],
            error: null,
        });
    });

    it('should handle errors and return a 500 status code', async () => {
        // Mock the implementation of findAllProducts to throw an error
        (findAllProducts as jest.Mock).mockRejectedValue(new Error('Some error'));

        await  new ProductController.getAllProducts(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            data: null,
            error: 'Internal Server Error',
        });
    });
});