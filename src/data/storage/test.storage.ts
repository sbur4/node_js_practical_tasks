import {USER_ROLE, UserEntity} from "../entity/user.entity";
import {ProductEntity} from "../entity/product.entity";
import {CartEntity} from "../entity/cart.entity";

const USER_1 = new UserEntity({
    name: "Boris",
    email: "boris_johnson@com.uk",
    // password:  "53kr37pa$$",
    password: "$2b$10$fnRbappCZ2sGr5zoWw39s.6SbWhkbs7nFO72YZxglJ1c57UdxIemi",
    role: USER_ROLE.ADMIN,
});

const USER_2 = new UserEntity({
    name: "Joe",
    email: "joe_baiden@fbi.usa",
    // password:  "H1dD3nK3Y",
    password: "$2b$10$K1CVEW/XaoI1hcVFgi.L3eI.TRqNhU23iS1V0o2Cq29qx/gBWCzEy",
    role: USER_ROLE.USER,
});

const USER_3 = new UserEntity({
    name: "Kate",
    email: "katty_middleton@gb.org",
    // password:  "p1NC0d3",
    password: "$2b$10$cwyI/C2hd2jD/dGTrYZYqe0tZyCprv/zmdJHKmO2zg4jcE2/i3WeW",
    role: USER_ROLE.USER,
});

const PRODUCT_1 = new ProductEntity({
    title: "Book",
    description: "Interesting book",
    price: 200
});

const PRODUCT_2 = new ProductEntity({
    title: "Pen",
    description: "Cute pen",
    price: 20
});

const PRODUCT_3 = new ProductEntity({
    title: "Laptop",
    description: "New Laptop",
    price: 1.99
});

const PRODUCT_4 = new ProductEntity({
    title: "Movie",
    description: "Drama",
    price: 35.78
});

const PRODUCT_5 = new ProductEntity({
    title: "Backpack",
    description: "EPAM backpack",
    price: 5
});

async function createUsers() {
    // await UserEntity.deleteOne({ email: "boris_johnson@com.uk"});
    // await USER_1.save();

    await UserEntity.deleteOne({email: "boris_johnson@com.uk"});
    await UserEntity.deleteOne({email: "joe_baiden@fbi.usa"});
    await UserEntity.deleteOne({email: "katty_middleton@gb.org"});
    await UserEntity.insertMany([USER_1, USER_2, USER_3]);
}

async function createProducts() {
    await ProductEntity.deleteOne({title: "Book"});
    await ProductEntity.deleteOne({title: "Pen"});
    await ProductEntity.deleteOne({title: "Laptop"});
    await ProductEntity.deleteOne({title: "Movie"});
    await ProductEntity.deleteOne({title: "Backpack"});

    await ProductEntity.insertMany([PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4, PRODUCT_5]);
}

async function createCart() {
    await CartEntity.deleteMany();

    const CART = new CartEntity({
        user: USER_1,
        items: [({
            product: PRODUCT_1,
            count: 1
        }), ({
            product: PRODUCT_2,
            count: 3
        })]
    });

    await CART.save();
}

export async function fillDatabase() {
    await createUsers();
    await createProducts();
    await createCart();
}