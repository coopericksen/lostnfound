import http from 'node:http';

import { serveStatic } from './utils/serveStatic.js';

import { handleGet } from './handlers/routeHandlers.js';
import { handlePost } from './handlers/routeHandlers.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (req.url === "/api/items") {
        if (req.method === "GET") {
            handleGet(res);
        } else if (req.method === "POST") {
            handePost(res);
        }

    } else if (req.url != "/api") {
        return await serveStatic(req, res, __dirname);
    }

});

server.listen(PORT, () => console.log(`Connected to port: ${PORT}`));