class ProductsNotFoundException extends Error {
    constructor() {
        super(`Products not found`)
        this.name = 'ProductsNotFoundException'
    }
}

export default ProductsNotFoundException
