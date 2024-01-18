// import {CartEntity, cartItemSchema} from "../../data/entity/cart.entity";
// import {CartItemsDto} from "../dto/cart.items.dto";
// import {createCartItemsDto} from "../converter/cart.dto.converter";
// import {CartUpdateEntity} from "../dto/cart.update.dto";
// import {CartRepository} from "../../data/repository/cart.repository";
//
// export class CartService {
//     private cartRepository: CartRepository;
//
//     constructor(cartRepository: CartRepository) {
//         this.cartRepository = cartRepository;
//     }
//
//     public getCart(userId: string): CartItemsDto {
//         const cart = this.cartRepository.getCartByUserId(userId);
//
//         if (!cart) {
//             this.cartRepository.addCart(userId);
//             const cart: CartEntity = cartRepository.etCartByUserId(userId);
//
//             const cartItemsDto: CartItemsDto = createCartItemsDto(cart);
//
//             console.log(`User does not have an active cart, new cart was created for user id:${userId}`);
//             return cartItemsDto;
//         }
//
//         console.log(`Cart was found by user id:${userId}`);
//         const cartItemsDto: CartItemsDto = createCartItemsDto(cart);
//
//         return cartItemsDto;
//     }
//
//     public addCart(userId: string): void {
//         const isActiveCart = cartRepository.isUserHasActiveCart(userId);
//
//         if (isActiveCart) {
//             console.warn(`User with id=${userId} already has a cart`);
//             return;
//         }
//
//         console.log(`New cart was created for user id:${userId}`);
//         cartRepository.addNewCart(userId);
//     }
//
//     public createNewCart(userId: string): CartEntity | undefined {
//         try {
//             const currentCart = cartRepository.getCartByUserId(userId);
//
//             if (currentCart) {
//                 return cartRepository.getCartByUserId(userId);
//             } else {
//                 cartRepository.addNewCart(userId);
//                 return cartRepository.getCartByUserId(userId);
//             }
//
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     public addProductsToCart(userId: string, cartUpdateEntity: CartUpdateEntity) {
//         try {
//             const updatedCart: CartEntity = cartRepository.updateCart(userId, cartUpdateEntity.productId,
//                 cartUpdateEntity.count);
//             console.log(`Cart was updated by user id:${userId}`)
//
//             return createCartItemsDto(updatedCart);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     public deleteCart(userId: string): void {
//         try {
//             cartRepository.removeCart(userId);
//             console.log(`Cart was deleted by user id:${userId}`)
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     public async validateReceivedUpdatedCartItem(updatedCartItem: CartUpdateEntity) {
//         try {
//             return await cartItemSchema.validateAsync(updatedCartItem);
//         } catch (error) {
//             const err = new Error('Validation error');
//             err.name = 'ValidationError';
//             throw err;
//         }
//     }
// }