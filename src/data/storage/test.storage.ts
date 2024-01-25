import {UserEntity} from "../entity/user.entity";
import {ProductEntity} from "../entity/product.entity";
import {CartEntity} from "../entity/cart.entity";

const USER_1 = new UserEntity({
    name: "Boris",
    email: "boris_johnson@com.uk",
});

const USER_2 = new UserEntity({
    name: "Joe",
    email: "joe_baiden@fbi.usa",
});

const USER_3 = new UserEntity({
    name: "Kate",
    email: "katty_middleton@gb.org",
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

// todo +