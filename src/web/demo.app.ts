import * as http from 'http'
import { Socket } from 'net'
import { debug } from 'debug'

import { authenticationCheck } from './middleware/auth.service'
import productRouter, { PRODUCT_URL } from './route/product.routes'
import cartRouter, { CART_URL } from './route/cart.routes'
import { IUserEntity } from '../data/entity/user.entity'
import { bootstrap } from './config/server.init'
import userRouter, { USER_URL } from './route/user.routes'
import { morganMiddleware } from './middleware/logger.service'

declare global {
    namespace Express {
        export interface Request {
            user: IUserEntity
        }
    }
}

bootstrap()
    .then((app) => {
        const server = http.createServer(app)

        const { PORT } = process.env
        const port = PORT != null || 3000
        const httpDebug = debug('app:http')

        app.get('/health', (req, res) => {
            res.status(200).json({ message: 'OK' })
        })

        app.get('/', (req, res) =>
            res.json({
                message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL}, ${USER_URL} endpoints!`,
            })
        )

        app.use('/api', authenticationCheck)
            .use(morganMiddleware)
            .use(PRODUCT_URL, productRouter)
            .use(CART_URL, cartRouter)
            .use(USER_URL, userRouter)

        app.use((req, res) =>
            res.status(404).json({ message: 'No route found' })
        )

        // server listening
        server.listen(port, () => {
            console.log(`Server is started at http://localhost:${port}`)
        })

        let connections: Socket[] = []

        server.on('connection', (connection) => {
            // register connections
            connections.push(connection)

            // remove/filter closed connections
            connection.on('close', () => {
                connections = connections.filter(
                    (currentConnection) => currentConnection !== connection
                )
            })
        })

        function shutdown() {
            const shutdownDebug = debug('app:shutdown')
            const shutdownErrorDebug = debug('app:shutdown:error')

            shutdownDebug('Received kill signal, shutting down gracefully')

            server.close(() => {
                shutdownDebug('Closed out remaining connections')
                process.exit(0)
            })

            setTimeout(() => {
                shutdownErrorDebug(
                    'Could not close connections in time, forcefully shutting down'
                )
                process.exit(1)
            }, 20000)

            // end current connections
            connections.forEach((connection) => connection.end())

            // then destroy connections
            setTimeout(() => {
                connections.forEach((connection) => connection.destroy())
            }, 10000)
        }

        process.on('SIGTERM', shutdown)
        process.on('SIGINT', shutdown)
    })
    .catch((error) => {
        console.log('Error starting server: ', error)
    })
