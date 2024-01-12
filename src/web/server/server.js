const http = require('http');
const url = require('url');
const CONFIG = require("../../web/config/config");
const ROUTER = require("../../web/router/routes");

const router = new ROUTER();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname;
    const routeHandler = findRouteHandler(router.routes, req.method, pathname);

    if (!routeHandler) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
    }

    try {
        routeHandler(req, res);
    } catch (error) {
        res.statusCode = 500;
        res.end('Server error');
        console.error(error);
    }
})

const config = new CONFIG();
const PORT = process.env.PORT || config.port;

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
})

function findRouteHandler(routes, method, url) {
    const route = routes[url];
    return route ? route[method] : null;
}