import {DI} from "../../web/demo.app";
import {CartItemsDto} from "../dto/car.items.dto";
import {createCartItemsDto} from "../converter/cart.dto.converter";
import {CartEntity} from "../../data/entity/cart.entity";
import {CartUpdateDto} from "../dto/cart.update.dto";
import {CartItemEntity} from "../../data/entity/cartItem.entity";

export async function findCartById(id: string): Promise<CartItemsDto> {
    const cart = await DI.cartRepository.findOne({id});
    console.log(`Cart was found by cart id:${id}`);

    if (!cart) {
        console.warn(`Cart not found for id:${id}`);
        throw new Error(`Cart not found for id: ${id}`);

        return {
            cart: new CartEntity(),
            total: 0
        };
    }

    const cartItemsDto: CartItemsDto = createCartItemsDto(cart!);

    return cartItemsDto;
}

export async function addCartByUserId(id: string): Promise<CartEntity> {
    return await createCartByUserId(id);
}

export async function addProductsToCart(userId: string, cartId: string, cartUpdateDto: CartUpdateDto)
    : Promise<CartItemsDto | undefined> {

    const currentCart = await DI.cartRepository.findOne({id: cartId});

    const product = await DI.productRepository.findOne({id: cartUpdateDto.productId});

    if (currentCart) {
        if (product) {
            if (currentCart.products.getItems().some(item => item.product.id === product.id)) {
                await DI.cartItemRepository.createQueryBuilder().update({count: cartUpdateDto.count})
                    .where({cart_id: currentCart.id}).andWhere({product_id: product.id});
                console.log(`Cart was updated by id:${currentCart.id}`);
            } else {
                const newItem: CartItemEntity = new CartItemEntity();
                newItem.cart = currentCart;
                newItem.product = product;
                newItem.count = cartUpdateDto.count;
                currentCart.products.add(newItem);

                // await DI.cartItemRepository.upsert(newItem);
                await DI.cartItemRepository.create(newItem);
                console.log(`Cart was created by id:${currentCart.id}`);
            }
        }

        const cartItemsDto: CartItemsDto = createCartItemsDto(currentCart!);

        return cartItemsDto;
    }
}

async function createCartByUserId(id: string) {
    console.warn(`Cart not found by user id:${id}`);

    const user = await DI.userRepository.findOne({id});
    const newCart: CartEntity = new CartEntity(false);
    newCart.user = user!;

    await DI.cartRepository.insert(newCart);
    console.log(`Cart was saved by id:${newCart.id}`);

    return newCart;
}