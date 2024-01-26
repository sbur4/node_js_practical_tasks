import * as http from "http";

import {authenticationCheck} from "./middleware/auth.service";
import productRouter, {PRODUCT_URL} from "./route/product.routes";
import cartRouter, {CART_URL} from "./route/cart.routes";
import {IUserEntity} from "../data/entity/user.entity";
import {bootstrap} from "./config/server.init";
import userRouter, {USER_URL} from "./route/user.routes";

declare global {
    namespace Express {
        export interface Request {
            user: IUserEntity
        }
    }
}
bootstrap().then((app) => {
    const server = http.createServer(app);

    const {PORT} = process.env;
    const port = PORT || 3000;

    app.get('/', (req, res) =>
        res.json({
            message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
        })
    );

    app.use('/api', authenticationCheck)
        .use(PRODUCT_URL, productRouter)
        .use(CART_URL, cartRouter)
        .use(USER_URL, userRouter);

    app.use((req, res) => res.status(404).json({message: 'No route found'}));

    // server listening
    server.listen(port, () => {
        console.log(`Server is started at http://localhost:${port}`)
    })
})


// const app = express();
// const port = process.env.PORT || 3000;

// const startServer = async () => {
//     try {
//         await connect(`mongodb://localhost:27017/admin`).then(() => console.log('Connected to MongoDB!'));
//
//         // Uncomment the line below to fill the database only once
//         // await fillDatabase();
//
//         app.use(express.json());
//         app.get('/', (req, res) =>
//             res.json({
//                 message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
//             })
//         );
//
//         app.use(authenticationCheck)
//             .use(PRODUCT_URL, productRouter)
//             .use(CART_URL, cartRouter);
//
//         app.use((req, res) =>
//             res.status(404).json({message: 'No route found'})
//         );
//
//         app.listen(port, () => {
//             console.log(`Server is started at http://localhost:${port}`)
//         });
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
//
// startServer().then(() => console.log('Init server...'));