import {UserEntity} from "../entity/user.entity";
import {EntityManager} from "@mikro-orm/core";
import {ProductEntity} from "../entity/product.entity";
import {CartEntity} from "../entity/cart.entity";
import {CartItemEntity} from "../entity/cartItem.entity";

const USER_1: UserEntity = new UserEntity("Boris");
USER_1.id = '0fe36d16-49bc-4aab-a227-f84df899a6cb';

const USER_2: UserEntity = new UserEntity("Joe");
USER_2.id = '0830da93-1dca-45a0-a740-ec5c83ad3aa5';

const USER_3: UserEntity = new UserEntity("Kate");
USER_3.id = '7731dce9-be16-4279-bfd5-c0b3ccfb7a14';

const PRODUCT_1: ProductEntity = new ProductEntity("Book", "Interesting book", 200);
PRODUCT_1.id = '5c293ad0-19d0-41ee-baa3-4c648f9f7697';

const PRODUCT_2: ProductEntity = new ProductEntity("Pen", "Cute pen", 20);
PRODUCT_2.id = 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a0';

const PRODUCT_3: ProductEntity = new ProductEntity("Laptop", "New Laptop", 1.99);
PRODUCT_3.id = '19e2c314-1d6c-4ea5-a3ec-d3e85aed3546';

const PRODUCT_4: ProductEntity = new ProductEntity("Movie", "Drama", 35.78);
PRODUCT_4.id = '10d740c6-63a0-4947-ab9e-0750f744146c';

const PRODUCT_5: ProductEntity = new ProductEntity("Backpack", "EPAM backpack", 5);
PRODUCT_5.id = '8acc13fa-7b8d-4426-80da-c1d4240ce4dc';

async function createUsers(em: EntityManager) {
    await em.persist([USER_1, USER_2, USER_3]).flush();
}

async function createProducts(em: EntityManager) {
    await em.persist([PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4, PRODUCT_5]).flush();
}

async function createCart(em: EntityManager) {
    const CART_ITEM_1: CartItemEntity = new CartItemEntity();
    CART_ITEM_1.id = '0fe36d16-49bc-4aab-a227-f84df899a6cb';
    CART_ITEM_1.product = PRODUCT_1;
    CART_ITEM_1.count = 2;

    const CART_ITEM_2: CartItemEntity = new CartItemEntity();
    CART_ITEM_2.id = '7ed22296-ecfa-4a11-a18a-7c0aca96ce06';
    CART_ITEM_2.product = PRODUCT_3;
    CART_ITEM_2.count = 3;

    const CART: CartEntity = new CartEntity(false);
    CART.id = '1434fec6-cd85-420d-95c0-eee2301a971d';
    CART.user = USER_1;
    CART.products.add(CART_ITEM_1);
    CART.products.add(CART_ITEM_2);

    await em.persist(CART).flush();
}

export async function fillDatabase(em: EntityManager) {
    em.fork();

    await createUsers(em);
    await createProducts(em);
    await createCart(em);
}